import { useState, type FormEvent } from "react";
import { Container } from "@/components/structuralComponents/Container";
import { FormDescription } from "../FormDescription";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { TextArea } from "@/components/base/textarea/textarea";
import { Label } from "@/components/base/input/label";
import { Image } from "@/components/structuralComponents/Image";
import { Paragraph } from "@/components/structuralComponents/Paragraph";
import { SpanText } from "@/components/structuralComponents/SpanText";
import { valueMasks } from "@/utils/valueMasks";
import styles from "./PersonalForm.module.css";
import cloudUpload from "@/assets/Assets Visuais/envato-labs-image-edit (3).png";
import type { LocationFormProps } from "../LocationForm";
import { useUserContext } from "@/contexts/userContext";


export function PersonalForm({nextStep}: LocationFormProps) {
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const { user, setUser } = useUserContext();

  const handleClearFile = () => {
    const fileInput = document.getElementById("profileImage") as HTMLInputElement;
    fileInput.value = "";
    setProfileImage(null);
    setPreviewUrl("");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === "image/jpeg" || file.type === "image/png") {
        setProfileImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Por favor, escolha uma imagem JPEG ou PNG.");
      }
    }
  };

  return (
    <Container classCss="">
      <FormDescription titleText="Personalize seu perfil" paragraphText="Dê ao seu perfil a sua cara!" />

      <form  className="space-y-6">
        <Container classCss="">
          <Input
            id="displayName"
            type="text"
            label="Como você que seu nome apareça no perfil?"
            placeholder="Nome de exibição"
            value={displayName}
            onChange={(displayName) => setDisplayName(displayName)}
            className={`${styles.input}`}
          />
        </Container>

        <Container classCss="">
          <TextArea
            id="bio"
            label="Conte um pouco sobre você"
            placeholder="Fale sobre você, de onde você é, sua trajetória ou qualquer coisa que ache relevante"
            value={bio}
            maxLength={600}
            isInvalid={bio.length >= 600}
            hint={`${bio.length}/600 caracteres`}
            onChange={(bio) => setBio(bio)}
            className={`${styles.input} ${styles.textarea}`}
          />
        </Container>

        <Container classCss="space-y-3">
          <Label className={`${styles.label}`}>Foto de perfil</Label>
          <Container classCss={`relative bg-gradient-to-b from-accent/80 to-accent rounded-xl p-8 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-md ${styles.fileContainer}`}>
            <input
              type="file"
              id="profileImage"
              accept="image/jpeg,image/png"
              onChange={handleFileChange}
              className="hidden"
            />
            
            {previewUrl ? (
              <Container classCss={styles.previewContainer}>
                <Container classCss={styles.preview}>
                    <Image
                    src={previewUrl}
                    alternateText="Preview"
                    className={styles.previewImage}
                    />
                    <Container classCss={styles.changeFileContainer}>
                        <SpanText text={profileImage?.name || ""} 
                        classCss={styles.previewText}/>
                        <SpanText text={valueMasks.convertToMB(profileImage?.size || 0)} 
                        classCss={`${styles.previewText} ${styles.previewSize}`}/>
                    </Container>
                    <Button type="button" 
                    className={styles.clearFile}
                    onClick={handleClearFile}>
                        X
                    </Button>
                </Container>
                <Button
                  type="button"
                  onClick={() => document.getElementById("profileImage")?.click()}
                  className={styles.changeFile}
                >
                  Escolher outro arquivo
                </Button>
              </Container>
            ) : (
              <>
                <Container classCss="mb-4 rounded-full bg-primary/10 flex items-center justify-center transition-transform duration-300 hover:scale-110">
                  <Image src={cloudUpload} className={styles.cloudUpload} alternateText="Nuvem lilás com seta para cima"/>
                </Container>
                <Paragraph classCss="text-accent-foreground font-medium mb-1" size="sm"  text="Selecione uma foto para fazer upload" />
                <Paragraph classCss="text-muted-foreground text-xs mb-4" size="sm" variant="secondary" text="Formatos suportados: JPEG e PNG" />
                <Button
                  type="button"
                  onClick={() => document.getElementById("profileImage")?.click()}
                  className={`${styles.btn} ${styles.btnImage}`}
                >
                  Escolher arquivo
                </Button>
              </>
            )}
          </Container>
        </Container>

        <Button
          type="submit"
          className={`${styles.btn} ${(displayName === "" || bio === "" || profileImage === null) && styles.btnDesactive}`}
          size="lg"
          isDisabled={displayName === "" || bio === "" || profileImage === null}
          onClick={(event: FormEvent) => {
            event.preventDefault();
            const newUser = user;
            newUser.socialName = displayName;
            newUser.miniBio = bio;
            newUser.avatar = profileImage;
            setUser(newUser);
            nextStep((previous: number) => previous + 1)         
          }}
        >
          Continuar
        </Button>
      </form>
    </Container>
  );
};

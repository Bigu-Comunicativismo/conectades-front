/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/base/buttons/button";
import { Container } from "@/components/structuralComponents/Container";
import { Image } from "@/components/structuralComponents/Image";
import { Paragraph } from "@/components/structuralComponents/Paragraph";
import { SpanText } from "@/components/structuralComponents/SpanText";
import { Input } from "@/components/base/input/input";
import { TextArea } from "@/components/base/textarea/textarea";
import styles from "./New.module.css";
import imageStyles from "@/components/SignUp/PersonalForm/PersonalForm.module.css";
import inputStyles from "@/components/base/input/Input.module.css";
import categoryStyles from "@/components/SignUp/PreferenceForm/PreferenceForm.module.css"
import cloudUpload from "@/assets/Assets Visuais/envato-labs-image-edit (3).png";
import { valueMasks } from "@/utils/valueMasks";
import { Title } from "@/components/structuralComponents/Title";
import { X } from "@untitledui/icons";
import { DatePicker } from "./DatePicker";
import { apiFetch } from "@/utils/fetchApi";
import type { DateRange } from "react-day-picker";
import { ButtonGroupFloating } from "@/components/structuralComponents/ButtonGroupFloating";
import { Campaign } from "@/interfaces/Campaign";
import { useNavigate } from "@tanstack/react-router";
import { useLoggedUserContext } from "@/contexts/loggedUserContext";
import { formNewDonation } from "@/utils/formNewDonation";
import { fetchedServiceTypes, type category } from "@/utils/setServiceTypes";


export function NewDonation() {

  type Neighborhood = {
        nome: string;
        id: string;
    }

    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [description, setDescription] = useState("");
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>("");
    const [categories, setCategories] = useState<category[] | never[]>([]);
    const [markedCategories, setMarkedCategories] = useState<number[] | never>([]);
    const [items] = useState([{ nome: "", quantidade_solicitada: 0 }])
    const [whatsapp, setWhatsapp] = useState("");
    const [city] = useState<string>("");
    const [neighborhood] = useState<string>("");
     
    const [neighborhoods, setNeighborhoods] = useState<Neighborhood[] | []>([]);
    const [cities, setCities] = useState<any[] | []>([]);
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
    const [isOnFocus, setIsOnFocus] = useState(true);
    const activeSection = useRef<HTMLDivElement>(null);
    const {loggedUser, setLoggedUser} = useLoggedUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        const storedloggedUser = localStorage.getItem("user");
        if(storedloggedUser) setLoggedUser({user: JSON.parse(storedloggedUser), tokens: JSON.parse(localStorage.getItem("tokens")!)});
        console.log(neighborhoods);
        
        const response = apiFetch({ apiPath: "https://conectades.com.br/api/auth/opcoes/" });
        response.then((data: any) => {
            setCities(data.cidades);
            return apiFetch({apiPath: "https://conectades.com.br/api/doacoes/tipos-servico/"})
        }).then((data: any) => {
            const dataCategories = fetchedServiceTypes(data);
            setCategories(dataCategories);
        });
    },[]);

    useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {

        setIsOnFocus(entry.isIntersecting);
        }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
        });
        
    observer.observe(activeSection.current!);

    return () => {observer.disconnect();}
    }, [activeSection]);

    useEffect(() => {
        const lockedCity: any = cities.find((listedCity: any) => listedCity.id === city);
        if(city !== "") {
        const response = apiFetch({ apiPath: `https://conectades.com.br/api/auth/bairros/${lockedCity?.nome}` });
        response.then((data: any) => {
            setNeighborhoods(data.bairros);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [city]);

    const handleSubmit = async () => {    
        // const lockedCity: any = cities.find((listedCity: any) => listedCity.id === Number(loggedUser?.user.cidade));
        let donationNeighborhood = "";
        if(neighborhood == ""){
             await apiFetch({ apiPath: `https://conectades.com.br/api/auth/bairros/${loggedUser?.user.cidade}` }).then((data: any) => {    
            const neighborhoods = data.bairros;
            donationNeighborhood = neighborhoods.find((neighborhood: any) => neighborhood.nome === loggedUser?.user.bairro).id

        });
        }
        
        const campaign = new Campaign(title, subtitle, description, loggedUser?.user.id, profileImage, markedCategories, whatsapp, Number(donationNeighborhood), dateRange?.from, dateRange?.to, true, JSON.stringify(items));

        const response = formNewDonation(campaign);

        response.then((data: any) => {
            console.log(data);
            navigate({to:"/donations"});
        })
        .catch((error: any) => {
            console.log(error)
            navigate({to:"/error"});
        });
    };

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
        <Container classCss={styles.container} ref={activeSection}>
            {isOnFocus ? <ButtonGroupFloating btn1Text="Cancelar" btn2Text="Criar" disebled={((!!title) && (!!subtitle) && (!!description) && (!!markedCategories) && (!!dateRange)) && (!!whatsapp) ? false : true} btn1Action={() => navigate({ to: "/" })
            } btn2Action={handleSubmit} /> : <div></div>}
            <Title.Level1 text="Criar doação" classCss={styles.title} />
            <Paragraph text="Doações são ações para quando você deseja doar algum serviço de forma voluntária para pessoas beneficiárias (ex. atendimento psicológico)" size="md" variant="secondary" classCss={styles.paragraph} />
            <Input label="Qual o título da sua doação?" 
            placeholder="Nome da doação" 
            type="text" 
            className={`${inputStyles.input} ${styles.inputMargin}`}
            value={title}
            onChange={(title) => setTitle(() => title)} />
            <Input label="Subtítulo da doação (Use uma frase curta que convida à aproveitar a oportunidade)" 
            placeholder="Ex. Atendimento gratuito" 
            type="text" 
            className={`${inputStyles.input} ${styles.inputMargin}`}
            value={subtitle}
            onChange={(subtitle) => setSubtitle(() => subtitle)} />
            <TextArea
            id="description"
            label="Descreva sua doação"
            placeholder="Fale sobre o serviço que está doando, como participar ou qualquer coisa que gostaria de destacar"
            value={description}
            maxLength={600}
            isInvalid={description.length >= 600}
            hint={`${description.length}/600 caracteres`}
            onChange={(description) => setDescription(description)}
            className={`${inputStyles.input} ${styles.inputMargin} ${description.length < 600 && imageStyles.inputError} ${imageStyles.textarea}`}
          />
            <Container classCss="space-y-3">
                <Container classCss={`relative rounded-xl p-8 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-md ${imageStyles.fileContainer}`}>
                    <input
                    type="file"
                    id="profileImage"
                    accept="image/jpeg,image/png"
                    onChange={handleFileChange}
                    className="hidden"
                    />
                    
                    {previewUrl ? (
                    <Container classCss={imageStyles.previewContainer}>
                        <Container classCss={imageStyles.preview}>
                            <Image
                            src={previewUrl}
                            alternateText="Preview"
                            className={imageStyles.previewImage}
                            />
                            <Container classCss={imageStyles.changeFileContainer}>
                                <SpanText text={profileImage?.name || ""} 
                                classCss={imageStyles.previewText}/>
                                <SpanText text={valueMasks.convertToMB(profileImage?.size || 0)} 
                                classCss={`${imageStyles.previewText} ${imageStyles.previewSize}`}/>
                            </Container>
                            <Button type="button" 
                            className={imageStyles.clearFile}
                            onClick={handleClearFile}>
                                X
                            </Button>
                        </Container>
                        <Button
                        type="button"
                        onClick={() => document.getElementById("profileImage")?.click()}
                        className={imageStyles.changeFile}
                        >
                        Escolher outro arquivo
                        </Button>
                    </Container>
                    ) : (
                    <>
                        <Container classCss="mb-4 rounded-full bg-primary/10 flex items-center justify-center transition-transform duration-300 hover:scale-110">
                            <Image src={cloudUpload} className={imageStyles.cloudUpload} alternateText="Nuvem lilás com seta para cima"/>
                        </Container>
                        <Paragraph classCss="text-accent-foreground font-medium mb-1" size="sm" text="Selecione uma foto para fazer upload" />
                        <Paragraph classCss="text-muted-foreground text-xs mb-4" size="sm" variant="secondary" text="Formatos suportados: JPEG e PNG" />
                        <Button
                        type="button"
                        onClick={() => document.getElementById("profileImage")?.click()}
                        className={`${imageStyles.btn} ${imageStyles.btnImage}`}
                        >
                        Escolher arquivo
                        </Button>
                    </>
                    )}
                </Container>
            </Container>
            <Paragraph text={"Selecione a categoria da sua doação"} size="sm" weight="medium" variant="secondary" classCss={categoryStyles.filtersLabel} />
            <Container classCss={categoryStyles.filtersContainer}>
                {categories.map((category) => (
                    <Button key={category.id} 
                    onClick={() => {
                    if (markedCategories.includes(category.id)) {
                        setMarkedCategories((previous) => previous.filter((listedCategory) => listedCategory !== category.id));
                    } else{
                    setMarkedCategories((previous) => [...previous, category.id])
                }
            }
        } 
                    className={`${categoryStyles.unselectedFilterBtn} ${markedCategories.includes(category.id) ? categoryStyles.selectedFilterBtn : ""}`}>{category.nome}{markedCategories.includes(category.id) ? <X /> : null}</Button> 
                ))}
            </Container>
            <Container classCss="w-full flex md:flex-row md:gap-6">
              <DatePicker setDateRange={setDateRange} dateRange={dateRange} />
            </Container>
            
            <Input label="Número de WhatsApp" 
            placeholder="(81) 9 9999-9999" 
            type="phone" 
            value={whatsapp}
            onChange={(whatsapp) => setWhatsapp(() => whatsapp)}
            className={inputStyles.input} />
        </Container>
    )
}
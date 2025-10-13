import { Container } from "@/components/structuralComponents/Container";
import { FormDescription } from "../FormDescription";
import { ToggleTypeUser } from "@/components/Home/AboutConectades/HowFunctionSection/ToggleTypeUser";
import { HowItWorksCard } from "@/components/Home/AboutConectades/HowFunctionSection/Card";
import { Button } from "@/components/base/buttons/button";
import styles from "./UserTypeForm.module.css";
import manWithBook from '@/assets/Assets Visuais/envato-graphic-9486d54a-4fc7-49c5-af97-4351e8bc1df5.png'
import oldMan from '@/assets/Assets Visuais/envato-graphic-50c6ef61-8964-455b-8b7d-5b91e4276c82.png'
import { Image } from "@/components/structuralComponents/Image";
import { useState } from "react";

export type UserType = "beneficiaria" | "doadora";

export function UserTypeForm({nextStep}: {nextStep: React.Dispatch<React.SetStateAction<number>>}) {
    const [userType, setUserType] = useState<UserType>("beneficiaria");
    

    return (
        <Container classCss="">
            <Container classCss={`flex flex-col items-center gap-8 ${styles.userTypeFormContainer}`} >
                <FormDescription titleText="Escolha em qual perfil você se encaixa" paragraphText="Tenha honestidade na escolha, pois não será possível mudar no futuro qual perfina" />
            </Container>
            <Container classCss={styles.changeUserTypeContainer}>
                <ToggleTypeUser userType={userType} setUserType={setUserType}/>
                <Image src={userType === "beneficiaria" ? manWithBook : oldMan} 
                alternateText={userType === "beneficiaria" ? "Ilustração de um homem segurando alguns livros" : "Ilustração de um homem de óculos com a mão estirada"} 
                className={styles.image} />
                <HowItWorksCard userType={userType}/>
            </Container>
            <Container classCss={styles.buttonContainer}>
                <Button className={styles.btn} 
                onClick={() => {
                    setUserType("beneficiaria")
                    nextStep((previous: number) => previous + 1)
                }}>Sou pessoa beneficiária</Button>
                <Button className={styles.btn} 
                onClick={() => {
                    setUserType("doadora")
                    nextStep((previous: number) => previous + 1)
                }}>Sou pessoa doadora</Button>
            </Container>
        </Container>
    );
}
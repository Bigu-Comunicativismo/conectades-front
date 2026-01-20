import { Container } from "@/components/structuralComponents/Container";
import styles from "./ToggleTypeUser.module.css";
import type { UserType } from "@/components/SignUp/UserTypeForm";

interface ToggleTypeUserProps {
  setUserType: React.Dispatch<React.SetStateAction<UserType>>;
  userType: string;
  classCss?: string
}

export function ToggleTypeUser({ setUserType, userType, classCss }: ToggleTypeUserProps) {
  
    return (
        <Container classCss={`flex justify-center items-center ${styles.toggleTypeUserContainer} ${classCss}`} >
          <div className={`${styles.toggleTypeUserItem} ${userType !== "5" && styles.toggleTypeUserItemVariant}`} 
          onClick={() => setUserType("5")}
          aria-label="Botão tipo de usuário beneficiária">Pessoas beneficiárias</div>
          <div className={`${styles.toggleTypeUserItem} ${userType !== "6" && styles.toggleTypeUserItemVariant}`}onClick={() => setUserType("6")}
          aria-label="Botão tipo de usuário doadora">Pessoas doadoras</div>
        </Container>
    );
}
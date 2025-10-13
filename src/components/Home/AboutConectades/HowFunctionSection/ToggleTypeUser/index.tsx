import { Container } from "@/components/structuralComponents/Container";
import styles from "./ToggleTypeUser.module.css";
import type { UserType } from "@/components/SignUp/UserTypeForm";

interface ToggleTypeUserProps {
  setUserType: React.Dispatch<React.SetStateAction<UserType>>;
  userType: string;
}

export function ToggleTypeUser({ setUserType, userType }: ToggleTypeUserProps) {
  
    return (
        <Container classCss={`flex justify-center items-center ${styles.toggleTypeUserContainer}`} >
          <div className={`${styles.toggleTypeUserItem} ${userType !== "beneficiaria" && styles.toggleTypeUserItemVariant}`} 
          onClick={() => setUserType("beneficiaria")}
          aria-label="Botão tipo de usuário beneficiária">Pessoas beneficiárias</div>
          <div className={`${styles.toggleTypeUserItem} ${userType !== "doadora" && styles.toggleTypeUserItemVariant}`}onClick={() => setUserType("doadora")}
          aria-label="Botão tipo de usuário doadora">Pessoas doadoras</div>
        </Container>
    );
}
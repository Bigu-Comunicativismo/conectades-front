import { Container } from "@/components/structuralComponents/Container";
import styles from "./ToggleTypeUser.module.css";

export function ToggleTypeUser() {
  
    return (
        <Container classCss={`flex justify-center items-center ${styles.toggleTypeUserContainer}`} >
          <div className={styles.toggleTypeUserItem}>Pessoas beneficiárias</div>
          <div className={`${styles.toggleTypeUserItem} ${styles.toggleTypeUserItemVariant}`}>Pessoas doadoras</div>
        </Container>
    );
}
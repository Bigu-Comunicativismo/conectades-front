import { Button } from "@/components/base/buttons/button";
import { Container } from "../Container";
import styles from "./ButtonGroupFloating.module.css";

export const ButtonGroupFloating = () => {
    return (
        <Container classCss={styles["button-group-floating"]}>
                <Button className={`${styles.btn} ${styles.outline}`}>Copiar link</Button>
                <Button className={styles.btn}>Apoiar esta causa</Button>
        </Container>
    );
};
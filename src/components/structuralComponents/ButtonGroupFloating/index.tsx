import { Button } from "@/components/base/buttons/button";
import { Container } from "../Container";
import styles from "./ButtonGroupFloating.module.css";
import btnStyles from "@/components/base/buttons/buttons.module.css";

type Props = {
    btn1Text: string;
    btn1Action: () => void;
    btn2Text: string;
    btn2Action: () => void;
    disebled?: boolean
}

export const ButtonGroupFloating = ({btn1Text, btn1Action, btn2Text, btn2Action, disebled}: Props) => {
    return (
        <Container classCss={styles["button-group-floating"]}>
                <Button className={`${btnStyles.btn} ${styles.outline}`} onClick={btn1Action}>{btn1Text}</Button>
                <Button className={`${btnStyles.btn} ${styles.btn} ${disebled ? btnStyles.btnDesactive : ''}`} onClick={btn2Action} isDisabled={disebled}>{btn2Text}</Button>
        </Container>
    );
};
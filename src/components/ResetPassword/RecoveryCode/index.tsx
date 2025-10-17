import { useState } from "react";
import { Container } from "@/components/structuralComponents/Container";
import { Title } from "@/components/structuralComponents/Title";
import { SpanText } from "@/components/structuralComponents/SpanText";
import { PinInput } from "@/components/base/pin-input/pin-input";
import titleStyle from "../NewPassword/NewPassword.module.css"
import styles from "./RecoveryCode.module.css";
import { Button } from "@/components/base/buttons/button";

export function RecoveryCode(){
    const [hasError] = useState(false);
    return (
        <Container classCss="">
            <Title.Level1 text="Digite o código de recuperação enviado para seu e-mail" classCss={titleStyle.title} />
            <Container classCss={styles.textContainer}>
                <SpanText text="Não recebeu?" classCss={styles.spanText}/>
                <SpanText text=" Reenviar código" classCss={`${styles.spanText} ${styles.spanLink}`} />
            </Container>
            <Container classCss={styles.container}>
                <PinInput size="lg">
                    <PinInput.Group maxLength={4} >
                        <PinInput.Slot className={styles.pinSlot}
                        index={0} />
                        <PinInput.Slot className={styles.pinSlot}
                        index={1} />
                        <PinInput.Slot className={styles.pinSlot}
                        index={2} />
                        <PinInput.Slot className={styles.pinSlot}
                        index={3} />
                    </PinInput.Group>
                </PinInput>
            </Container>
            {hasError && <Button className={styles.btn}>Tentar novamente</Button>}
        </Container>
    )
}
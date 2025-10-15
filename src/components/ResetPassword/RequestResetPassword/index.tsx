import { useState } from "react";
import { Title } from "@/components/structuralComponents/Title";
import { Container } from "@/components/structuralComponents/Container";
import { Input } from "@/components/base/input/input";
import { Button } from "@/components/base/buttons/button";
import { SpanText } from "@/components/structuralComponents/SpanText";
import { validations } from "@/utils/validations";
import { Mail01 } from "@untitledui/icons";
import titleStyle from "../NewPassword/NewPassword.module.css"
import styles from "./RequestResetPassword.module.css";
import inputStyles from "@/components/base/input/Input.module.css";

export function RequestResetPassword() {
    const [email, setEmail] = useState("");
    const [hasEmailError, setHasEmailError] = useState(false);
    return (
        <Container classCss={styles.container}>
            <Container classCss="">
                <Title.Level1 text="Insira seu e-mail cadastrado" classCss={titleStyle.title} />
                <Input placeholder="Email" 
                className={inputStyles.input} 
                onChange={(email) => {
                    if(validations.email(email)){
                        setHasEmailError(false)
                    }else{
                        setHasEmailError(true)
                    }
                    setEmail(email)}} 
                value={email}
                type="email" 
                icon={Mail01}/>
            </Container>
            <Container classCss={styles.ButtonContainer}>
                <Button className={`${styles.btn} ${hasEmailError && styles.btnDesactive}`} 
                isDisabled={hasEmailError} >Enviar</Button>
                <SpanText text="Voltar para Login" classCss={styles.spanText} />
            </Container>
        </Container>
    );
}
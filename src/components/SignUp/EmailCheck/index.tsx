import { useState } from "react";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Container } from "@/components/structuralComponents/Container";
import { SpanText } from "@/components/structuralComponents/SpanText";
import { Title } from "@/components/structuralComponents/Title";
import { Mail01 } from "@untitledui/icons";
import { validations } from "@/utils/validations";
import { useUserContext } from "@/contexts/userContext";
import { type LocationFormProps as EmailCheckFormProps } from "../LocationForm";
import inputStyles from "@/components/base/input/Input.module.css";
import buttonStyles from "@/components/base/buttons/buttons.module.css";
import styles from "./EmailCheck.module.css";


export function EmailCheck({nextStep}: EmailCheckFormProps) {
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState(false)
    const [loadingVerification, setLoadingVerification] = useState(false)
    const { user, setUser } = useUserContext();

    const handleSubmit = async () => {
        setLoadingVerification(true)
        const response = await fetch("https://jsonplaceholder.typicode.com/user")
        if(response.ok){
            setLoadingVerification(false)
            window.location.href = "/login"
        } else {
            setLoadingVerification(false)
            const newUser = user;
            newUser.email = email;
            setUser(newUser);
            nextStep((previous) => previous + 1)
        }
    }

    return (
        <Container classCss="">
            <Title.Level1 text="Insira um e-mail para começar o cadastro!" classCss={styles.title}/>
            <Container classCss="">
                <SpanText text="Já tem uma conta? " classCss={styles.spanText}/>
                <SpanText text="Entrar" classCss={styles.spanLink}/>
            </Container>
            <Input id="E-mail"
                type="email"
                label="E-mail"
                icon={Mail01}
                placeholder="Insira seu e-mail"
                isInvalid={emailError}
                hint={emailError ? "Insira um e-mail valido" : null}
                value={email}
                onChange={(email) => {
                    if(validations.email(email)){
                        setEmail(email)
                        setEmailError(false)
                    }else{
                        setEmail(email)
                        setEmailError(true)
                    }
                    return }}
                className={`${inputStyles.input}`}/>
            <Button className={`${buttonStyles.btn} ${(loadingVerification || emailError || email === "") && buttonStyles.btnDesactive}`}
            type="button"
                onClick={handleSubmit}
                isDisabled={loadingVerification || emailError || email === ""}>Continuar</Button>
        </Container>
    )    
}
import { useState } from "react";
// import { useFetch } from "@/utils/fetchApi";
import { Container } from "@/components/structuralComponents/Container";
import { Title } from "@/components/structuralComponents/Title";
import { Paragraph } from "@/components/structuralComponents/Paragraph";
import styles from './Login.module.css';
import { LoginForm } from "@/components/Login/Form";


export function Login () {
    const [isValidEmail, setIsValidEmail] = useState(false);

    return (
        <Container classCss={styles.container}>
            <Title.Level1 text={ isValidEmail ? "Digite sua senha para entrar!" : "Insira seu e-mail para iniciar!" } classCss={styles.title} />
            <Paragraph text="Não tem uma conta?" size="sm" variant="secondary" />
            <LoginForm isValidEmail={isValidEmail} setIsValidEmail={setIsValidEmail}/>
        </Container>
    )
}
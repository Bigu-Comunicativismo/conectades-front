import { useState } from "react";
// import { useFetch } from "@/utils/fetchApi";
import { Container } from "@/components/structuralComponents/Container";
import { Title } from "@/components/structuralComponents/Title";
import styles from "./Login.module.css";
import spanStyles from "@/components/SignUp/EmailCheck/EmailCheck.module.css";
import { LoginForm } from "@/components/Login/Form";
import { SpanText } from "@/components/structuralComponents/SpanText";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/login/')({
  component: Login,
});


export function Login () {
    const [isValidEmail, setIsValidEmail] = useState(false);

    return (
        <Container classCss={styles.container}>
            <Title.Level1 text={ isValidEmail ? "Digite sua senha para entrar!" : "Insira seu e-mail para iniciar!" } classCss={styles.title} />
            <SpanText text="Não tem uma conta?" classCss={spanStyles.spanText} /> <Link to="/signup"><SpanText classCss={spanStyles.spanLink} text="Cadastre-se" /></Link>
            <LoginForm isValidEmail={isValidEmail} setIsValidEmail={setIsValidEmail}/>
        </Container>
    )
}
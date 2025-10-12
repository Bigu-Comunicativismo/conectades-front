import { Title } from "@/components/structuralComponents/Title";
import { Paragraph } from "@/components/structuralComponents/Paragraph";
import { PasswordInput } from "./PasswordInput";
import { Button } from "@/components/base/buttons/button";
import { SpanText } from "@/components/structuralComponents/SpanText";
import styles from "./PasswordForm.module.css";
import { Container } from "@/components/structuralComponents/Container";
import { validations } from "@/utils/validations";
import { useState } from "react";

export function PasswordForm() {
    const [inputPasswordValue, setInputPasswordValue] = useState('');
    const [inputConfirmPasswordValue, setInputConfirmPasswordValue] = useState('');
    const {passwordHasUpperandLower, passwordHasNumber,  passwordHasMinChar}: {passwordHasUpperandLower: boolean, passwordHasNumber: boolean,  passwordHasMinChar: boolean} = validations.password(inputPasswordValue)
    return (
        <form className={styles.formContainer}>
            <Container classCss={styles.container}>
                <Title.Level1 text="Crie uma senha" 
                classCss={styles.title}/>
                <Paragraph text="Estamos terminando! Por último, crie sua senha, ela será utilizada para você acessar seu perfil" 
                size="sm" 
                weight="regular" 
                variant="secondary" 
                classCss={styles.paragraph}/>
            </Container>
            <Container classCss={styles.inputContainer}>
                <Container classCss={styles.inputContainer}>
                    <PasswordInput inputLabel="Nova senha" inputPlaceholder="Senha" inputValue={inputPasswordValue} setInputValue={setInputPasswordValue}/>
                    <SpanText text="• No mínimo 8 caracteres" 
                    classCss={`${styles.spanText} ${passwordHasMinChar && styles.passwordSuccess}`}/>
                    <SpanText text="• Ao menos uma letra maiúscula" 
                    classCss={`${styles.spanText} ${passwordHasNumber && styles.passwordSuccess}`}/>
                    <SpanText text="• Ao menos um número" 
                    classCss={`${styles.spanText} ${passwordHasUpperandLower && styles.passwordSuccess}`}/>
                </Container>
                <Container classCss={styles.inputContainer}>
                    <PasswordInput inputLabel="Confirme a nova senha" inputPlaceholder="Confirme sua senha" inputValue={inputConfirmPasswordValue} setInputValue={setInputConfirmPasswordValue}/>
                    <SpanText text="• As senhas devem ser iguais" 
                    classCss={`${styles.spanText} ${(validations.confirmPassword(inputPasswordValue, inputConfirmPasswordValue) && inputPasswordValue !== '') && styles.passwordSuccess}`}/>
                </Container>
            </Container>
                <Button className={`${styles.btn} ${((!passwordHasUpperandLower && !passwordHasNumber && !passwordHasMinChar) || (inputPasswordValue !== inputConfirmPasswordValue)) && styles.btnDesactive}`} type="submit"
                isDisabled={(!passwordHasUpperandLower && !passwordHasNumber && !passwordHasMinChar) || (inputPasswordValue !== inputConfirmPasswordValue)}>Criar conta</Button>
        </form>
    )
}
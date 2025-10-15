import { PasswordInput } from "./PasswordInput";
import { Button } from "@/components/base/buttons/button";
import { SpanText } from "@/components/structuralComponents/SpanText";
import styles from "./PasswordForm.module.css";
import { Container } from "@/components/structuralComponents/Container";
import { validations } from "@/utils/validations";
import { useState, type FormEvent } from "react";
import { FormDescription } from "../FormDescription";
import { useUserContext } from "@/contexts/userContext";

export function PasswordForm() {
    const [inputPasswordValue, setInputPasswordValue] = useState('');
    const [inputConfirmPasswordValue, setInputConfirmPasswordValue] = useState('');
    const {passwordHasUpperandLower, passwordHasNumber,  passwordHasMinChar}: {passwordHasUpperandLower: boolean, passwordHasNumber: boolean,  passwordHasMinChar: boolean} = validations.password(inputPasswordValue);

    const {user, setUser} = useUserContext();

    return (
        <form >
            <FormDescription titleText="Crie uma senha" paragraphText="Estamos terminando! Por último, crie sua senha, ela será utilizada para você acessar seu perfil"/>
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
                isDisabled={(!passwordHasUpperandLower && !passwordHasNumber && !passwordHasMinChar) || (inputPasswordValue !== inputConfirmPasswordValue)}
                onClick={(event: FormEvent) => {
                    event.preventDefault()
                    const newUser = user;
                    newUser.password = inputPasswordValue;
                    setUser(newUser);
                    console.log(user);
                }}>Criar conta</Button>
        </form>
    )
}
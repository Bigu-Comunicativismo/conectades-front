import { Container } from "@/components/structuralComponents/Container";
import { PasswordInput } from "../PasswordInput";
import { SpanText } from "@/components/structuralComponents/SpanText";
import { validations } from "@/utils/validations";
import styles from "../PasswordForm.module.css"

interface PasswordVerificationProps {
    inputPasswordValue: string;
    setInputPasswordValue: React.Dispatch<React.SetStateAction<string>>;
    inputConfirmPasswordValue: string;
    setInputConfirmPasswordValue: React.Dispatch<React.SetStateAction<string>>;
}

export function PasswordVerification({inputPasswordValue, setInputPasswordValue, inputConfirmPasswordValue, setInputConfirmPasswordValue}: PasswordVerificationProps) {

    const {passwordHasUpperandLower, passwordHasNumber,  passwordHasMinChar}: {passwordHasUpperandLower: boolean, passwordHasNumber: boolean,  passwordHasMinChar: boolean} = validations.password(inputPasswordValue);

    return (
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
    )
}
import { useState } from "react";
import { Container } from "@/components/structuralComponents/Container";
import { Button } from "@/components/base/buttons/button";
import { Title } from "@/components/structuralComponents/Title";
import { PasswordVerification } from "@/components/SignUp/PasswordForm/PasswordVerification";
import { validations } from "@/utils/validations";
import styles from "./NewPassword.module.css"

export function NewPassword() {

    const [inputPasswordValue, setInputPasswordValue] = useState('');
    const [inputConfirmPasswordValue, setInputConfirmPasswordValue] = useState('');
    const {passwordHasUpperandLower, passwordHasNumber,  passwordHasMinChar} = validations.password(inputPasswordValue);
    validations.confirmPassword(inputPasswordValue, inputConfirmPasswordValue)

    return (
        <Container classCss="">
            <Title.Level1 text="Cadastre sua nova senha" classCss={styles.title}/>
            <PasswordVerification inputConfirmPasswordValue={inputConfirmPasswordValue} setInputConfirmPasswordValue={setInputConfirmPasswordValue} inputPasswordValue={inputPasswordValue} setInputPasswordValue={setInputPasswordValue}/>
            <Button className={`${styles.btn} ${(!passwordHasUpperandLower || !passwordHasNumber ||  !passwordHasMinChar || !validations.confirmPassword(inputPasswordValue, inputConfirmPasswordValue)) && styles.btnDesactive}`}>Alterar senha</Button>
        </Container>
    );
}
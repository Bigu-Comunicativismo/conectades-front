import { Button } from "@/components/base/buttons/button";
import { PasswordVerification } from "./PasswordVerification";
import styles from "./PasswordForm.module.css";
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
            <PasswordVerification inputPasswordValue={inputPasswordValue} setInputPasswordValue={setInputPasswordValue} inputConfirmPasswordValue={inputConfirmPasswordValue} setInputConfirmPasswordValue={setInputConfirmPasswordValue} />
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
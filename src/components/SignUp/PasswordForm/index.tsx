import { Button } from "@/components/base/buttons/button";
import { PasswordVerification } from "./PasswordVerification";
import styles from "./PasswordForm.module.css";
import { validations } from "@/utils/validations";
import { useState, type FormEvent } from "react";
import { FormDescription } from "../FormDescription";
import { useUserContext } from "@/contexts/userContext";
import { signUpUsers } from "@/utils/formSignUp";
import { useNavigate } from "@tanstack/react-router";

export function PasswordForm() {
    const [inputPasswordValue, setInputPasswordValue] = useState('');
    const [inputConfirmPasswordValue, setInputConfirmPasswordValue] = useState('');
    const {passwordHasUpperandLower, passwordHasNumber,  passwordHasMinChar}: {passwordHasUpperandLower: boolean, passwordHasNumber: boolean,  passwordHasMinChar: boolean} = validations.password(inputPasswordValue);
    const navigate = useNavigate();
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

                    const response = signUpUsers(user);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    response.then((data: any) => {
                        if (data) {
                            navigate({to:"/login"});
                        }
                    }).catch((error) => {
                        console.log(error)
                        navigate({to:"/error"});
                    });
                    
                }}>Criar conta</Button>
        </form>
    )
}
import { Input } from "@/components/base/input/input";
import { Container } from "@/components/structuralComponents/Container";
import { Button } from "@/components/base/buttons/button";
import styles from './Input.module.css';
import inputStyles from "@/components/base/input/Input.module.css";
import { Mail01, Passcode, Eye, EyeOff } from "@untitledui/icons";
import { useState, type FormEvent } from "react";
import { apiFetch } from "@/utils/fetchApi";
import { useLoggedUserContext } from "@/contexts/loggedUserContext";
import { useNavigate } from "@tanstack/react-router";



interface LoginInputProps {
    isValidEmail: boolean;
    setIsValidEmail: React.Dispatch<React.SetStateAction<boolean>>;
}

export function LoginForm({isValidEmail, setIsValidEmail}: LoginInputProps) {
    const navigate = useNavigate();
    const { setLoggedUser } = useLoggedUserContext();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const [inputValue, setInputValue] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hasEmail, setHasEmail] = useState(false);
    const [hasEmailError, setHasEmailError] = useState(false);
    const [ isShowPassword, setIsShowPassword ] = useState(false);
    const [ passwordType, setPasswordType ] = useState('text');
    const [passwordInvalid, setPasswordInvalid] = useState<boolean>(false);

    return (
        <form>
            <Container classCss='flex relative'>
                <Input 
                    label={ isValidEmail ? "Senha" : "Email" } 
                    type={ passwordType } 
                    icon={ isValidEmail ? Passcode : Mail01 } 
                    placeholder={ isValidEmail ? "Digite sua senha" : "Insira seu e-mail" }
                    value={inputValue}
                    autoFocus={true}
                    onChange={(inputValue) => {
                        if(emailRegex.test(inputValue)){
                            setHasEmailError(false)
                            setHasEmail(true)
                        }else if(!emailRegex.test(inputValue)){
                                setHasEmailError(true)
                                setHasEmail(false)
                            }
                        setInputValue(inputValue);
                        return isValidEmail ? setPassword(inputValue) : setEmail(inputValue)}} 
                    className={`${inputStyles.input} ${styles.input}`}
                    hint={(hasEmailError && password === '' && !hasEmail) ? "Este e-mail não é válido" : passwordInvalid ? "Senha incorreta. Tente novamente ou redefina a senha." : null}
                    isInvalid={(hasEmailError && password === '') || passwordInvalid}
                    />
                    {isValidEmail ? isShowPassword ? 
                    <div className={`${styles.eyeOffIcon} ${passwordInvalid && styles.eyeIcon}`} 
                    onClick={() => {
                        setIsShowPassword(!isShowPassword)
                        setPasswordType('password')}}>
                        <Eye/>
                    </div>
                    :
                    <div className={`${styles.eyeOffIcon} ${passwordInvalid && styles.eyeIcon}`} 
                    onClick={() => {
                        setIsShowPassword(!isShowPassword)
                        setPasswordType('text')}}>
                        <EyeOff/>
                    </div> : null
                    }
            </Container>
                {isValidEmail ? <Button className={`${styles.btn} ${!password && styles.btnDesactive}`} onClick={(event: FormEvent) => {
                event.preventDefault();
                const user ={
                email,
                password
                };
                
                    const response = apiFetch({ apiPath: "https://conectades.com.br/api/auth/login/", apiMethod: "POST", apiBody: user, apiHeaders: { 'Content-Type': 'application/json' } });
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    response.then((data: any) => {
                        setLoggedUser({user: data.user, tokens: data.tokens});
                        localStorage.setItem('tokens', JSON.stringify(data.tokens));
                        localStorage.setItem('user', JSON.stringify(data.user));
    
                        return navigate({ to: '/' })
                        
                    }).catch((error) => {
                        console.log(error);
                        setPasswordInvalid(true) 
                    })

                }}  isDisabled={password === ''}>Entrar</Button> : <Button className={`${styles.btn} ${!hasEmail && styles.btnDesactive}`} isDisabled={!hasEmail} onClick={(event: FormEvent) => {
                event.preventDefault();
                setInputValue('');
                setIsValidEmail(true)
                setPasswordType('password')}}>Continuar</Button>}
        </form>
    )
}
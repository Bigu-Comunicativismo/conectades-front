import { Input } from "@/components/base/input/input"
import { Container } from "../../../structuralComponents/Container"
import { useState } from "react"
import { Eye, EyeOff, Passcode } from "@untitledui/icons";
import styles from "./PasswordInput.module.css";
import inputStyles from "@/components/base/input/Input.module.css";

interface PasswordInputProps {
    inputLabel: string;
    inputPlaceholder: string;
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

export function PasswordInput ({inputLabel, inputPlaceholder, inputValue, setInputValue}:PasswordInputProps) {

    const [passwordType, setPasswordType] = useState('password');
    const [isShowPassword, setIsShowPassword] = useState(false);
    

    return (
        <Container classCss='flex relative'>
                <Input 
                    label={inputLabel} 
                    type={ passwordType } 
                    icon={ Passcode } 
                    placeholder={inputPlaceholder}
                    value={inputValue}
                    onChange={(inputValue) => {
                       setInputValue(inputValue);
                       }} 
                    className={inputStyles.input}
                    />
                    {isShowPassword ? 
                    <div className={`${styles.eyeIcon}`} 
                    onClick={() => {
                        setIsShowPassword(!isShowPassword)
                        setPasswordType('password')}}>
                        <Eye/>
                    </div>
                    :
                    <div className={`${styles.eyeIcon}`} 
                    onClick={() => {
                        setIsShowPassword(!isShowPassword)
                        setPasswordType('text')}}>
                        <EyeOff/>
                    </div>
                    }
            </Container>
    )
}
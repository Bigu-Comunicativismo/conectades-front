import { useState } from "react";
import { ProgressBar } from "../base/progress-indicators/progress-indicators";
import { Section } from "../structuralComponents/Section";
import { BiographyForm } from "./BiographyForm";
import { PasswordForm } from "./PasswordForm";
import { LocationForm } from "./LocationForm";
import { PersonalForm } from "./PersonalForm";
import { PreferenceForm } from "./PreferenceForm";
import { UserTypeForm } from "./UserTypeForm";
import styles from "./SignUp.module.css";


const renderStep = (signUpstep: number, setSignUpStep: React.Dispatch<React.SetStateAction<number>>) => {
    
    switch (signUpstep) {
    case 1:
        return <UserTypeForm nextStep={setSignUpStep}/>
        break;
    case 2:
        return <BiographyForm nextStep={setSignUpStep}/>
        break;
    case 3:
        return <LocationForm nextStep={setSignUpStep}/>
        break;
    case 4:
        return <PersonalForm nextStep={setSignUpStep}/>
        break;
    case 5:
        return <PreferenceForm nextStep={setSignUpStep} />
        break;
    case 6:
        return <PasswordForm />
        break;
    default:
        return null
        break;
    }}

export function SignUp() {
    
    const [step, setStep] = useState(1);
    

    return (
        <Section>
            <ProgressBar min={0} max={6} value={step} className={styles.stepCounter}/>
            { 
                renderStep(step, setStep)
            }
        </Section>
    );
}
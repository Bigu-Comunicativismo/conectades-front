import { useState } from "react";
import { ProgressBar } from "../base/progress-indicators/progress-indicators";
import { Section } from "../structuralComponents/Section";
import { EmailCheck } from "./EmailCheck";
import { UserTypeForm } from "./UserTypeForm";
import { BiographyForm } from "./BiographyForm";
import { LocationForm } from "./LocationForm";
import { PersonalForm } from "./PersonalForm";
import { PreferenceForm } from "./PreferenceForm";
import { PasswordForm } from "./PasswordForm";
import styles from "./SignUp.module.css";
import { SuccessMessage } from "./SuccessMessage";
import imgBg1 from "@/assets/Assets Visuais/Rectangle 1312.svg"
import imgBg2 from "@/assets/Assets Visuais/Rectangle 13120.svg"
import imgBg3 from "@/assets/Assets Visuais/Rectangle 13121.svg"
import imgBg4 from "@/assets/Assets Visuais/Rectangle 13122.svg"
import imgBg5 from "@/assets/Assets Visuais/Rectangle 13123.svg"
import { setOptions } from "@/utils/setOptions";


const renderStep = (signUpstep: number, setSignUpStep: React.Dispatch<React.SetStateAction<number>>) => {

    let categories, location;
    const storedLocations = localStorage.getItem('locations');
    const storedCategories = localStorage.getItem('categories');
    if (storedCategories) categories = JSON.parse(storedCategories);
    if (storedLocations) location = JSON.parse(storedLocations);
    if (!categories || !location) {
        setOptions().then(() => {
            categories = JSON.parse(localStorage.getItem('categories')!);
            location = JSON.parse(localStorage.getItem('locations')!);
        })}
    
    switch (signUpstep) {
    case 0:
        return <EmailCheck nextStep={setSignUpStep}/>
        break;
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
        return <PreferenceForm nextStep={setSignUpStep} preferences={{category:categories, locations: location}}/>
        break;
    case 6:
        return <PasswordForm nextStep={setSignUpStep} />
        break;
    case 7:
        return <SuccessMessage />
        break;
    default:
        return null
        break;
    }}

export function SignUp() {
    
    const [step, setStep] = useState(0);
    

    return (
        <Section classCss={styles.externalContainer}>
            <div className={styles.contentContainer}>
            { step > 0 && <ProgressBar min={0} max={6} value={step} className={styles.stepCounter}/>}
            { 
                renderStep(step, setStep)
            }</div>
            {step === 7 ||  <div style={{backgroundImage: `url(${(step === 0 || step === 5) ? imgBg1 : (step === 1 || step === 6) ? imgBg2 : step === 2 ? imgBg3 : step === 3 ? imgBg4 : step === 4 ? imgBg5 : imgBg1})`}} aria-hidden="true" className={styles.bgImg}></div>}
        </Section>
    );
}
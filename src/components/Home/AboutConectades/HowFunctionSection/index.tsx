import { useState } from 'react';
import { Container } from '@/components/structuralComponents/Container';
import { Title } from '@/components/structuralComponents/Title';
import { Paragraph } from '@/components/structuralComponents/Paragraph';
import { Image } from '@/components/structuralComponents/Image';
import manWithBook from '@/assets/Assets Visuais/envato-graphic-9486d54a-4fc7-49c5-af97-4351e8bc1df5.png'
import styles from './HowFunctionSection.module.css';
import { HowItWorksCard } from './Card';
import { ToggleTypeUser } from './ToggleTypeUser';
import type { UserType } from '@/components/SignUp/UserTypeForm';

export function HowFunctionSection() {
    const [userType, setUserType] = useState<UserType>("beneficiaria");
    return (
        <Container classCss={`flex flex-col items-center gap-8 ${styles.howFunctionContainer}`}>
            <Title.Level2 text="Como Conectades funciona?" />
            <Paragraph text="Conectades é uma plataforma que conecta quem precisa com quem quer ajudar!" size="lg" />
            <ToggleTypeUser userType={userType} setUserType={setUserType}/>
            <Image src={manWithBook} alternateText="Ilustração de um homem segurando alguns livros" className={styles.image} />
            <HowItWorksCard userType={userType}/>
        </Container>
    );
}
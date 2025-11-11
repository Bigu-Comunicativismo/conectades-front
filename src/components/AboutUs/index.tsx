import { Container } from "../structuralComponents/Container";
import { Title } from "../structuralComponents/Title";
import { Paragraph } from "../structuralComponents/Paragraph";
import { Image } from "../structuralComponents/Image";
import { Section } from "../structuralComponents/Section";
import { HowFunctionSection } from "../Home/AboutConectades/HowFunctionSection";
import biguTeam from "@/assets/Assets Visuais/equipe bigu.png";
import aboutPlatform from "@/assets/Assets Visuais/envato-graphic-ff9a422c-178c-42c5-9c9e-2527c73a2eb7 1.png";
import styles from "./AboutUs.module.css";

export function AboutUs(){
    
    return (
        <Container classCss={styles.container} ariaLabel="Informações sobre nós" >
            <Section classCss={styles.section}>
                <div id="sobreabigu"></div>
                <Title.Level2 text="Sobre a Bigu" />
                <Paragraph text="A Bigu Comunicativismo, sediada no Recife, mas nascida pro mundo, é uma organização focada em fortalecer estratégias de comunicação para emancipação e mobilização de organizações, movimentos, indivíduos e territórios defensores de um modelo de mundo no qual pessoas e meio ambiente sejam priorizados acima do lucro." size="lg" />
                <Image src={biguTeam} alternateText="Foto com pessoas da Bigu Comunicativismo" className={styles.image} />
            </Section>
            <Section classCss={styles.section}>
                <div id="sobreaplataforma"></div>
                <Title.Level2 text="Sobre a plataforma" />
                <Paragraph text="Conectades é uma solução voltada para grupos marginalizadas (mulheres e pessoas trans) a fim de que essas pessoas tenham mobilizem campanhas e tenham acesso a oportunidades  de cursos e serviços." size="lg" />
                <Image src={aboutPlatform} alternateText="Ilustração de pessoas diversas de mãos dadas e sorrindo" className={styles.image} />
            </Section>
            <div id="comofunciona"></div>
            <HowFunctionSection />
        </Container>
    );
}
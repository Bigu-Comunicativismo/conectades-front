import { Container } from "../structuralComponents/Container";
import { Title } from "../structuralComponents/Title";
import { Paragraph } from "../structuralComponents/Paragraph";
import { Image } from "../structuralComponents/Image";
import { Section } from "../structuralComponents/Section";
import { HowFunctionSection } from "../Home/AboutConectades/HowFunctionSection";
import biguTeam1 from "@/assets/Assets Visuais/equipe-bigu.svg";
import biguTeam2 from "@/assets/Assets Visuais/equipe bigu.png";
import aboutPlatform from "@/assets/Assets Visuais/envato-graphic-ff9a422c-178c-42c5-9c9e-2527c73a2eb7 1.png";
import styles from "./AboutUs.module.css";
import { ChildrenParagraph } from "../structuralComponents/Paragraph/ChildrenParagraph";

export function AboutUs(){
    
    return (
        <Container classCss={styles.container} ariaLabel="Informações sobre nós" >
            <Section classCss={styles.section}>
                <div id="sobreabigu"></div>
                <Title.Level1 text="Sobre a Bigu" classCss={styles.titlePrincipal}/>
                <Paragraph text="A Bigu Comunicativismo, sediada no Recife, mas nascida pro mundo, é uma organização focada em fortalecer estratégias de comunicação para emancipação e mobilização de organizações, movimentos, indivíduos e territórios defensores de um modelo de mundo no qual pessoas e meio ambiente sejam priorizados acima do lucro." size="lg" classCss={styles.paragraphAbout}/>
                <Image src={biguTeam1} alternateText="Foto com pessoas da Bigu Comunicativismo" className={styles.image1} />
                <Image src={biguTeam2} alternateText="Foto com pessoas da Bigu Comunicativismo" className={styles.image2} />
            </Section>
            <Section classCss={`${styles.section} ${styles.inverterSection}`}>
                <div id="sobreaplataforma" className={styles.descriptionContainer}>
                <Title.Level2 text="Sobre a plataforma" />
                <ChildrenParagraph size="lg">
                    Conectades é uma <strong className={styles.strong}>solução voltada para grupos marginalizadas</strong> (mulheres e pessoas trans) a fim de que essas pessoas tenham <strong className={styles.strong}>mobilizem campanhas e tenham acesso a oportunidades  de cursos e serviços.</strong>
                </ChildrenParagraph>
                </div>
                <Image src={aboutPlatform} alternateText="Ilustração de pessoas abraçadas" className={styles.image} />
            </Section>
            <Section classCss={styles.section}>
                <div id="comofunciona"></div>
                <HowFunctionSection />
            </Section>
        </Container>
    );
}
import { Container } from "@/components/structuralComponents/Container";
import { Button } from "@/components/base/buttons/button";
import { Title } from "@/components/structuralComponents/Title";
import { Paragraph } from "@/components/structuralComponents/Paragraph";
import { Image } from "@/components/structuralComponents/Image";
import styles from "./LoginError.module.css";
import error from "@/assets/Assets Visuais/envato-graphic-b3f22aec-976e-43f6-ba2d-0191a81e4e97 1.png";

export function LoginError() {
    return (
        <Container classCss={styles.container}>
            <Image src={error} alternateText="Ilustração de erro com uma mulher em dúvida" className={styles.image} />
            <Title.Level1 classCss={styles.title} text="Ops, identificamos algum erro."/>
            <Paragraph size="md" weight="regular" text="Tente novamente. Caso o problema persista, entre em contato conosco!" classCss={styles.paragraph}/>
            <Button className={styles.btn}>Tentar novamente</Button>
        </Container>
    );
}
import { Container } from "../structuralComponents/Container";
import { Image } from "../structuralComponents/Image";
import { Paragraph } from "../structuralComponents/Paragraph";
import styles from "@/pages/error/LoginError.module.css";
import error from "@/assets/Assets Visuais/envato-graphic-b3f22aec-976e-43f6-ba2d-0191a81e4e97 1.png";

export  function Error() {
 return (
    <Container classCss={styles.container}>
        <Image src={error} alternateText="Ilustração de erro com uma mulher em dúvida" className={styles.image} />
        <Paragraph size="md" weight="semibold" text="Nenhum resultado encontrado" classCss={styles.paragraph}/>
        <Paragraph size="sm" weight="regular" text="Tente remover ou refazer a filtragem" classCss={styles.paragraph}/>
    </Container>
 );
}
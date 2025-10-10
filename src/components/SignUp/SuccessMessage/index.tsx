import { Container } from "@/components/structuralComponents/Container";
import { Title } from "@/components/structuralComponents/Title";
import { Paragraph } from "@/components/structuralComponents/Paragraph";
import { Image } from "@/components/structuralComponents/Image";
import styles from "./SuccessMessage.module.css";
import success from "@/assets/Assets Visuais/envato-graphic-16565ad0-28f4-4f88-8105-1bf3bd296793.png";

export function SuccessMessage() {
    return (
        <Container classCss={styles.container}>
                <Image
                    src={success}
                    alternateText="Ilustração de uma mulher negra fazendo sinal de legal."
                    className={styles.image}                    
                />                
                <Title.Level1 text="Conta criada com sucesso!" classCss={styles.title}/>
                <Paragraph text="Por favor, aguarde... Estamos redirecionando você" size="md" weight="regular" classCss={styles.paragraph}/>
        </Container>
    );
}
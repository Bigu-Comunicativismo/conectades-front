import { Container } from "@/components/structuralComponents/Container";
import { Paragraph } from "@/components/structuralComponents/Paragraph";
import { Title } from "@/components/structuralComponents/Title";
import styles from "./FormDescription.module.css";

interface FormDescriptionProps {
    titleText: string;
    paragraphText: string;
}

export function FormDescription({titleText, paragraphText }: FormDescriptionProps) {
    return (
            <Container classCss={styles.container}>
                <Title.Level1 text={titleText} 
                classCss={styles.title}/>
                <Paragraph text={paragraphText} 
                size="sm" 
                weight="regular" 
                variant="secondary" 
                classCss={styles.paragraph}/>
            </Container>
    )
}
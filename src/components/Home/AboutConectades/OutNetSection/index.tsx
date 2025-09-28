import { Container } from "@/components/structuralComponents/Container";
import { Image } from "@/components/structuralComponents/Image";
import { Paragraph } from "@/components/structuralComponents/Paragraph";
import { Title } from "@/components/structuralComponents/Title";
import people from '@/assets/Assets Visuais/envato-graphic-378a93e3-5041-42e4-87d2-f001ef08bd32.png';
import styles from './OutNetSection.module.css';
export function OutNetSection() {
    return (
        <Container classCss={`flex flex-col items-center gap-8 ${styles.aboutConectadesContainer}`}>
            <Title.Level2 text="Valorizamos a rede fora da rede" />
            <Paragraph text="Nem tudo precisa acontecer dentro da plataforma. Acreditamos e incentivamos a doação e apoio fora da Conectades, visando fortalecer a solidariedade e justiça social." size="md" />
            <Image src={people} alternateText="Ilustração de pessoas diversas de mãos dadas e sorrindo" className={styles.image} />
        </Container>
    );
}
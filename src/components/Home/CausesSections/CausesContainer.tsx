import { Container } from "@/components/structuralComponents/Container";
import styles from './CausesContainer.module.css';

export function CausesContainer({ children }: { children: React.ReactNode }) {
    return (
        <Container classCss={styles.causesContainer}>
            {children}
        </Container>
    )
}
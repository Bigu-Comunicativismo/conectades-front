import { Container } from '../Container'
import styles from './Card.module.css';

type CardGap = 'gap4' | 'gap8' | 'gap16' | 'gap24' | 'gap32';

interface InforContainerProps {
    cardGap?: CardGap;
    children: React.ReactNode;
}

export function InforContainer({ children, cardGap = 'gap8' }: InforContainerProps) {
    return (
        <Container classCss={`${styles.inforContainer} ${styles[cardGap]}`}>
            {children}
        </Container>
    );
}
import { useTabContext } from "@/contexts/campaign";
import { Container } from "@/components/structuralComponents/Container";
import styles from './TabNav.module.css';

export function TabNav() {
    const {activeItem, setActiveItem} = useTabContext();
    return (
        <Container classCss=''>
            <ul className={styles.navigationList}>
                <li className={`${styles.navigationListItem} ${ activeItem === 'Sobre' && styles.navigationListItemActive}`} aria-label="Aba Sobre" onClick={() => setActiveItem('Sobre')}>Sobre</li>
                <li className={`${styles.navigationListItem} ${ activeItem === 'Organização' && styles.navigationListItemActive}`} aria-label="Aba Organização" onClick={() => setActiveItem('Organização')}>Organização</li>
                <li className={`${styles.navigationListItem} ${ activeItem === 'Apoios' && styles.navigationListItemActive}`} aria-label="Aba Apoios" onClick={() => setActiveItem('Apoios')}>Apoios</li>
                <li className={`${styles.navigationListItem} ${ activeItem === 'Atualizações' && styles.navigationListItemActive}`} aria-label="Aba Atualizações" onClick={() => setActiveItem('Atualizações')}>Atualizações</li>
            </ul>
        </Container>
    )
}
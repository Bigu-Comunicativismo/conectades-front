import { Container } from "@/components/structuralComponents/Container";
import styles from './TabNav.module.css';
import { useState } from "react";

type itemList = 'Sobre' |'Organização' | 'Apoios' | 'Atualizações'

export function TabNav() {
    const [activeItem, setActiveItem] = useState<itemList>('Apoios');
    return (
        <Container classCss=''>
            <ul className={styles.navigationList}>
                <li className={`${styles.navigationListItem} ${ activeItem === 'Sobre' && styles.navigationListItemActive}`} aria-label="Sobre" onClick={() => setActiveItem('Sobre')}>Sobre</li>
                <li className={`${styles.navigationListItem} ${ activeItem === 'Organização' && styles.navigationListItemActive}`} aria-label="Organização" onClick={() => setActiveItem('Organização')}>Organização</li>
                <li className={`${styles.navigationListItem} ${ activeItem === 'Apoios' && styles.navigationListItemActive}`} aria-label="Apoios" onClick={() => setActiveItem('Apoios')}>Apoios</li>
                <li className={`${styles.navigationListItem} ${ activeItem === 'Atualizações' && styles.navigationListItemActive}`} aria-label="Atualizações" onClick={() => setActiveItem('Atualizações')}>Atualizações</li>
            </ul>
        </Container>
    )
}
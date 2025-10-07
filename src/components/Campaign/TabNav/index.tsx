import { useTabContext } from "@/contexts/campaign";
import { Container } from "@/components/structuralComponents/Container";
import styles from './TabNav.module.css';

type Tab = {
    id: number,
    name: 'Sobre' | 'Organização' | 'Apoios' | 'Atualizações'
}

export function TabNav({tabList}: {tabList: Tab[]}) {
    const {activeItem, setActiveItem} = useTabContext();
    return (
        <Container classCss=''>
            <ul className={styles.navigationList}>
                {tabList.map((tab) => {
                    return <li className={`${styles.navigationListItem} ${activeItem === tab.name && styles.navigationListItemActive}`} aria-label={`Aba ${tab}`} onClick={() => setActiveItem(tab.name)} key={tab.id}>{tab.name}</li>
                })}
            </ul>
        </Container>
    )
}
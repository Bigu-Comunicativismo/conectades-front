import { ImageIcon } from '@/components/structuralComponents/ImageIcon';
import campaingnIcon from '@/assets/Assets Visuais/envato-graphic-e417e6db-4b26-48ec-9acd-9fb83cebe3a6.png'
import donationIcon from '@/assets/Assets Visuais/envato-graphic-1be80dd4-214a-4576-ae14-65f1a7a9ddfb.png';
import oportunityIcon from '@/assets/Assets Visuais/envato-labs-image-edit (1).png';
import contentIcon from '@/assets/Assets Visuais/envato-graphic-182670cb-fdc2-4ecf-9593-a1f033bab446.png';
import styles from './FilterButton.module.css';

function FilterButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
    return (
        <button className={styles.filterButton} onClick={onClick}>
            {children}
        </button>
    );
}

const filters = [
{ label: 'Campanhas', iconUrl: campaingnIcon, onClick: () => console.log('Campanhas clicked') },
{ label: 'Doações', iconUrl: donationIcon, onClick: () => console.log('Doações clicked') },
{ label: 'Oportunidades', iconUrl: oportunityIcon, onClick: () => console.log('Oportunidades clicked') },
{ label: 'Conteúdos', iconUrl: contentIcon, onClick: () => console.log('Conteúdos clicked') },
];


export function FilterButtonGroup() {
    return (
        <div className={styles.filterButtonContainer}>
            {filters.map((filter) => (
                <FilterButton key={filter.label} onClick={filter.onClick}>
                    <ImageIcon iconUrl={filter.iconUrl} alternateText={`Ícone de ${filter.label}`} variante='filter' />
                    <span className={styles.filterLabel}>{filter.label}</span>
                </FilterButton>
            ))}
        </div>
    );
}
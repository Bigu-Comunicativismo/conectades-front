import { ImageIcon } from '@/components/structuralComponents/ImageIcon';
import campaingnIcon from '@/assets/Assets Visuais/envato-graphic-e417e6db-4b26-48ec-9acd-9fb83cebe3a6.png'
import donationIcon from '@/assets/Assets Visuais/envato-graphic-1be80dd4-214a-4576-ae14-65f1a7a9ddfb.png';
import oportunityIcon from '@/assets/Assets Visuais/envato-labs-image-edit (1).png';
import styles from './FilterButton.module.css';
import { Link } from '@tanstack/react-router';

function FilterButton({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link to={href}>
            <button className={styles.filterButton} >
                {children}
            </button>
        </Link>
    );
}

const filters = [
{ label: 'Campanhas', iconUrl: campaingnIcon, href: '/campaigns' },
{ label: 'Doações', iconUrl: donationIcon, href: '/donations' },
{ label: 'Oportunidades', iconUrl: oportunityIcon, href: '/opportunities' },
];


export function FilterButtonGroup() {
    return (
        <div className={styles.filterButtonContainer}>
            {filters.map((filter) => (
                <FilterButton key={filter.label} href={filter.href}>
                    <ImageIcon iconUrl={filter.iconUrl} alternateText={`Ícone de ${filter.label}`} variante='filter' />
                    <span className={styles.filterLabel}>{filter.label}</span>
                </FilterButton>
            ))}
        </div>
    );
}
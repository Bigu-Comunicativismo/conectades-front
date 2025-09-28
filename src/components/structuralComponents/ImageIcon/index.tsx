import styles from './ImageIcon.module.css';

interface ImageIconProps {
    iconUrl: string;
    alternateText: string;
    variante?: 'filter' | 'mini';
};

export function ImageIcon({ iconUrl, alternateText, variante }: ImageIconProps) {
    return (
        <img className={`${styles.imageIcon} ${variante ? styles[variante] : ''}`} src={iconUrl} alt={alternateText} />
    )
}
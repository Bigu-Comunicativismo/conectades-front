import conectadesLogo from '@/assets/Assets Visuais/conectades-logo.svg';
import { Link } from '@tanstack/react-router';
import styles from './Logo.module.css';

export function Logo() {
    return (
        <Link to="/">
            <img className={styles.logo} src={conectadesLogo} alt="Conectades em lilás, tendo o último e em amarelo." />
        </Link>
    );
}
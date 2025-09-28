import { Header as UntitledHeader } from "../marketing/header-navigation/header";
import styles from './Header.module.css';

export function Header() {
    return (
        <UntitledHeader className={styles.customHeader}/>
    );
}

//npx untitledui@latest add dropdown-menu-simple npx untitledui@latest add hero-split-image-01
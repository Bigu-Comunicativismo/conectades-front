import { Header as UntitledHeader } from "../marketing/header-navigation/header";
import styles from "./Header.module.css";

export function Header() {
    return (
        <UntitledHeader className={styles.customHeader}/>
    );
}
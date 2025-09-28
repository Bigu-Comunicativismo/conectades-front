import styles from './Card.module.css';

export function Author({name}: {name?: string}) {
    return (
        <p className={styles.author}>{name ? name : "Autor Desconhecido"}</p>
    )
}
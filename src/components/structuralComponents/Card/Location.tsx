import styles from './Card.module.css';

export function Location({ location }: { location: string }) {
    return (
        <p className={styles.location}>{location}</p>
    )
}
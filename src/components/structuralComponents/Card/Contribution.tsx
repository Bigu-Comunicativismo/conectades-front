import styles from './Card.module.css'

export function Contribution({ quantityContribution }: { quantityContribution: number }) {
    return (
        <p className={styles.contributionParagraph}><span className={styles.contributionNumber}>{quantityContribution}</span>{quantityContribution <= 1 ? ' apoio recebido' : ' apoios recebidos'}</p>
    )
}
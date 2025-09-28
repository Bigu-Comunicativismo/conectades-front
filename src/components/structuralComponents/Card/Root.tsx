import styles from './Card.module.css';

export function Root({ classCss, children }: { classCss?: string; children: React.ReactNode }) {
    return (
        <div className={`${styles.root} ${classCss}`} aria-label='Card Component'>
            {children}
        </div>
    )
}


import styles from './Section.module.css';

export function Section({ classCss, children }: { classCss?: string; children: React.ReactNode }) {
    return (
        <section className={`${styles.Section} ${classCss}`}>
            {children}
        </section>
    )
};
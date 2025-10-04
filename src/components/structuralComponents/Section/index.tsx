import styles from './Section.module.css';

export function Section({ classCss, ref, children }: { classCss?: string; ref?: React.RefObject<HTMLDivElement | null>; children: React.ReactNode }) {
    return (
        <section className={`${styles.Section} ${classCss}`} ref={ref}>
            {children}
        </section>
    )
};
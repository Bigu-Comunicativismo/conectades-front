import styles from './Section.module.css';

export function Section({ classCss, ref, children, ...props }: { classCss?: string; ref?: React.RefObject<HTMLDivElement | null>; children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
    return (
        <section className={`${styles.Section} ${classCss}`} ref={ref} {...props}>
            {children}
        </section>
    )
};
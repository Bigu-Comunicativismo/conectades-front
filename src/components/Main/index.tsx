import styles from './Main.module.css';

export function Main({classCss,children}: {classCss?: string; children: React.ReactNode}) {
    return (
        <main className={`${styles.main} ${classCss}`}>
            {children}
        </main>
    )
};
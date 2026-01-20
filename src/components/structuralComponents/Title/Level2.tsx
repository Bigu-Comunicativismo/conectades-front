import styles from './Title.module.css';

export function Level2({ text, classCss }: { text: string, classCss?: string }) {
  return (
    <h2 className={`${styles.titleH2} ${classCss}`}>{text}</h2>
  );
}
import styles from './Title.module.css';

export function Level2({ text }: { text: string }) {
  return (
    <h2 className={styles.titleH2}>{text}</h2>
  );
}
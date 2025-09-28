import styles from './Title.module.css';

export function Level1({ text }: { text: string }) {
  return (
    <h1 className={styles.titleH1}>{text}</h1>
  );
}
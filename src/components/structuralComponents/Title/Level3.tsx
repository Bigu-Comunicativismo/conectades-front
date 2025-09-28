import styles from './Title.module.css';

export function Level3({ text }: { text: string }) {
  return (
    <h3 className={styles.titleH3}>{text}</h3>
  );
}
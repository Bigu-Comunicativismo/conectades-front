import styles from './Title.module.css';

export function Level4({ text }: { text: string }) {
  return (
    <h4 className={styles.titleH4}>{text}</h4>
  );
}
import styles from './Title.module.css';

export function Level5({ text }: { text: string }) {
  return (
    <h5 className={styles.titleH5}>{text}</h5>
  );
}
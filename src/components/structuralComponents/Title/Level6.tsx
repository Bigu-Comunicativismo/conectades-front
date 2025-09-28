import styles from './Title.module.css';

export function Level6({ text }: { text: string }) {
  return (
    <h6 className={styles.titleH6}>{text}</h6>
  );
}
import styles from './Title.module.css';

export function Level1({ text, classCss }: { text: string, classCss?: string }) {
  return (
    <h1 className={`${styles.titleH1} ${classCss}`}>{text}</h1>
  );
}
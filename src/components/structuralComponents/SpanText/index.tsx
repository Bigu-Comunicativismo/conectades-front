import styles from './SpanText.module.css';

interface SpanTextProps {
    text: string;
}

export function SpanText({ text }: SpanTextProps) {
    return (
        <span className={styles.spanText}>{text}</span>
    )
}
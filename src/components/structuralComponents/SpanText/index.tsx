import styles from './SpanText.module.css';

interface SpanTextProps {
    text: string;
    classCss?: string;
}

export function SpanText({ text, classCss }: SpanTextProps) {
    return (
        <span className={`${styles.spanText} ${classCss}`}>{text}</span>
    )
}
import styles from './Paragraph.module.css';

interface ParagraphProps {
  text: string;
  size: 'sm' | 'md' | 'lg';
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  variant?: 'primary' | 'secondary';
}

export function Paragraph({text, size, weight = 'regular', variant = 'primary'}: ParagraphProps) {
  return (
    <p className={`${styles.paragraph} ${styles[size]} ${styles[weight]} ${styles[variant]}`}>
      {text}
    </p>
  );
}

import styles from '../Paragraph.module.css';

interface ParagraphProps {
  children: React.ReactNode;
  size: 'sm' | 'md' | 'lg';
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  variant?: 'primary' | 'secondary';
  classCss?: string;
}

export  function ChildrenParagraph({children, size, weight = 'regular', variant = 'primary', classCss}: ParagraphProps) {
 return (
   <p className={`${styles.paragraph} ${styles[size]} ${styles[weight]} ${styles[variant]} ${classCss}`}>
     {children}
   </p>
 );
}
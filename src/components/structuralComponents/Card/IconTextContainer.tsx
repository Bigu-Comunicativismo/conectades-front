import { Container } from '../Container'
import styles from './Card.module.css'

interface IconTextContainerProps {
    variant?: boolean,
    children: React.ReactNode
}

export function IconTextContainer({ children, variant }: IconTextContainerProps) {
    return (
        <Container classCss={`${styles.IconTextContainer} ${variant ? styles['IconTextContainer-variant'] : ''}`}>
            {children}
        </Container>
)
}
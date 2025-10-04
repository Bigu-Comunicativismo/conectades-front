import { Avatar } from "@/components/base/avatar/avatar";
import { Container } from "@/components/structuralComponents/Container";
import { Paragraph } from "@/components/structuralComponents/Paragraph";
import type { User } from "../../Organization/Profile";
import styles from './Message.module.css';

export type Contribuition = {
    id: number
    message: string
    user?: User | null
}

interface MessageProps {
    contribuitionMessage: Contribuition
}

export function Message ({contribuitionMessage}:MessageProps) {
    return (
        <Container classCss={styles.messageContainer} aria-label='message-container'>
            <Avatar src={contribuitionMessage.user ? contribuitionMessage.user?.avatar : ''} className={styles.avatar}/>
            <Container classCss={styles.messageInfoContainer} aria-label='message-info-container'> 
                <Paragraph size="md" weight="regular" text={contribuitionMessage.user ? contribuitionMessage.user.name : 'Anonimo'}/>
                <Paragraph size="sm" weight="regular" text={contribuitionMessage.message} classCss={styles.message}/>
            </Container>
        </Container>
    )
}
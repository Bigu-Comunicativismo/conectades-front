import { Avatar } from "@/components/base/avatar/avatar";
import { Container } from "@/components/structuralComponents/Container";
import { Paragraph } from "@/components/structuralComponents/Paragraph";
import styles from './Message.module.css';
import { useEffect } from "react";
import { imgBaseUrl } from "@/utils/imgBaseUrl";

type doador = {
    id: number
    avatar: string
    nome_exibicao: string
}

export type Contribuition = {
    id: number
    message: string
    status: string
    doador?: doador | null
}

interface MessageProps {
    contribuitionMessage: Contribuition
}

export function Message ({contribuitionMessage}:MessageProps) {
    useEffect(() => {
        console.log(contribuitionMessage);
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <Container classCss={styles.messageContainer} aria-label='message-container'>
            <Avatar src={contribuitionMessage.doador ? `${imgBaseUrl}${contribuitionMessage.doador?.avatar}` : ''} className={styles.avatar}/>
            <Container classCss={styles.messageInfoContainer} aria-label='message-info-container'> 
                <Paragraph size="md" weight="regular" text={contribuitionMessage.doador ? contribuitionMessage.doador.nome_exibicao : 'Anonimo'}/>
                {/* <Paragraph size="sm" weight="regular" text={contribuitionMessage.message} classCss={styles.message}/> */}
            </Container>
        </Container>
    )
}
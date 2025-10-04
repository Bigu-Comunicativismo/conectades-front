import { Avatar } from "@/components/base/avatar/avatar";
import { Container } from "@/components/structuralComponents/Container";
import { ChevronRight } from "@untitledui/icons";
import styles from './Profile.module.css';
import { Paragraph } from "@/components/structuralComponents/Paragraph";
import { Button } from "@/components/base/buttons/button";

export type User = {
    name: string;
    avatar: string;
    url: string;
    location: string;
    type: string;
    contact: string;
}

interface ProfileProps {
    user: User;
}

export function Profile ({user}:ProfileProps) {
    return (
        <Container classCss={styles.profileContainer}>
            <Avatar src={user.avatar} className={styles.avatar}/>
            <Container classCss={styles.profileInfoContainer}>
                <Paragraph size="md" weight="regular" text={user.name}/>
                <Paragraph size="sm" weight="regular" variant="secondary" text={user.type} classCss={styles.profileDetails}/>
                <Paragraph size="sm" weight="regular" variant="secondary" text={user.location}/>
                <Button className={`${styles.btn} ${styles.contact}`} href={user.contact}>Entrar em contato</Button>
            </Container>
            <Button className={styles.btn} href={user.url}>Ver perfil<ChevronRight color="#666"/></Button>
        </Container>
    )
}
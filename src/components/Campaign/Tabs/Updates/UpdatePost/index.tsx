import { Container } from "@/components/structuralComponents/Container";
import { SpanText } from "@/components/structuralComponents/SpanText";
import { Image } from "@/components/structuralComponents/Image";
import { Paragraph } from "@/components/structuralComponents/Paragraph";
import styles from "./UpdatePost.module.css";

export type updatePost = {
    id: number,
    date: string,
    image?: { url: string, alternateText: string } | null, 
    text: string
}

interface UpdatePostProps {
    update: updatePost
}

export function UpdatePost({ update }: UpdatePostProps) {
    return (
        <Container classCss={styles.updatePostContainer} key={update.id}>
            <SpanText text={update.date} classCss={styles.updatePostTitle}/>
            {update.image ? <Image alternateText={update.image ? update.image?.alternateText : ''} src={update.image ? update.image?.url : ''} className={styles.updatePostImage}/> : null}
            <Paragraph size="sm" weight="regular" text={update.text}/>
        </Container>
    )
}
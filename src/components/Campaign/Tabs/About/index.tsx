import { Button } from "@/components/base/buttons/button";
import { Container } from "@/components/structuralComponents/Container";
import { Image } from "@/components/structuralComponents/Image";
import { Paragraph } from "@/components/structuralComponents/Paragraph";
import { useState } from "react";
import styles from './About.module.css';

interface causes {
    id: number;
    description: string;
    coverImageUrl: string;
    bottomImageUrl: string;
    alternateText: string;

}

interface AboutProps {
    campaign: causes
}

export function About({ campaign }: AboutProps) {

    const [ paragraph ] = useState(campaign.description);
    const [ paragraphLength ] = useState(campaign.description.length);
    const [ isExpanded, setIsExpanded ] = useState(false)

    return (
        <>
            <Container classCss="flex flex-col">
                <Paragraph text={paragraph} size="md" classCss={`${styles.paragraph} ${isExpanded === true ? styles.expanded : ''}`} />
                {paragraphLength >= 400 ? <Button onClick={() => setIsExpanded(!isExpanded)} className={styles.btn}>{isExpanded === true ? 'Ver menos' : 'Ver mais'}</Button> : null}
                <Image src={campaign.bottomImageUrl} alternateText={campaign.alternateText} className={styles.campaignImage}/>
            </Container>
        </>
    )
}
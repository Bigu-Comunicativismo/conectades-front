import { Badge } from "@/components/base/badges/badges";
import { Card } from "@/components/structuralComponents/Card";
import { SpanText } from "@/components/structuralComponents/SpanText";
import { Paragraph } from "@/components/structuralComponents/Paragraph";
import { Container } from "@/components/structuralComponents/Container";
import { Clock, HeartHand } from "@untitledui/icons";
import styles from './Details.module.css';


type SolicitedItem = {
    id: number;
    nome: string;
    quantidade_solicitada: string;
    quantidade_contribuida: string;
};



interface CampaignDetailsProps {
    daysRemaining: number;
    solicitedItems: SolicitedItem[];
    contributions: number;
}

export function CampaignDetails({daysRemaining, solicitedItems, contributions}: CampaignDetailsProps) {
    return (
       <Card.Root classCss={styles.cardContainer}>
        <Badge color="orange" className={styles.campaingDeadline}>
            <Clock className={`icon ${styles.campaingDeadlineIcon}`} size={12} /><SpanText text={daysRemaining.toString()} classCss={styles.campaingDeadlineValue}/>&nbsp;{daysRemaining === 1 ? 'dia restante' : 'dias restantes'}
        </Badge>
        <Container classCss={styles.solicitedItemsContainer}>
            {solicitedItems.map((item) => (
                <Container key={item.id} classCss={`flex flex-row justify-between items-center ${item.quantidade_solicitada === item.quantidade_contribuida ? styles.solicitedItemCompleted : ''}`} >
                    <Paragraph text={item.nome} size="md" />
                    <span className={styles.solicitedItemQuantitys}>
                        <Paragraph text={item.quantidade_contribuida} size="md" classCss={styles.solicitedItems} />
                        /
                        <Paragraph text={item.quantidade_solicitada} size="md" classCss={styles.solicitedItems} />
                    </span>
                </Container>
            ))}
        </Container>
        <Card.IconTextContainer>
            <HeartHand className="icon" color='#9c59d1'/>
            <Card.Contribution quantityContribution={contributions}/>
        </Card.IconTextContainer>
       </Card.Root>
    );
}
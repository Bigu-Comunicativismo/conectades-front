import { Edit05, MarkerPin01 } from "@untitledui/icons";
import { Card } from "../Card";
import { Container } from "../Container";
import { useNavigate } from "@tanstack/react-router";
import styles from "./MiniCard.module.css";
import { Badge } from "@/components/base/badges/badges";
import { SpanText } from "../SpanText";
import { type CardProps } from "@/components/Home/Card/DonationAndOportunity";
import { Link } from "@tanstack/react-router";
import { imgBaseUrl } from "@/utils/imgBaseUrl";

export interface MiniCardItem extends Omit<CardProps, "cardAuthor"> {
    contribuition?: number;
}

type CardType = "campaigns" | "donations";

export function MiniCard({card, cardType}: {card: MiniCardItem, cardType: CardType}) {
    const navigate = useNavigate();
    return (
        
            <Card.Root classCss={styles.miniCardContainer} key={card.cardId}>
                <Link to={`/${cardType}/$id`} params={{id: String(card.cardId)}}>
                <Card.CardImage src={`${imgBaseUrl}${card.cardImage}`} 
                alternateText={`Capa da campanha ${card.cardName}`} 
                className={styles.miniCardImage}/>
                </Link>
                <Link to={`/${cardType}/$id`} params={{id: String(card.cardId)}} className={styles.link}>
                <Container classCss={styles.miniCard}>
                    <Badge color="purple" className={styles.campaingDeadline}>{card.cardTag}</Badge>
                    <SpanText text={card.cardName} classCss={styles.cardName}/>
                    <Card.IconTextContainer>
                        <MarkerPin01 className="icon" color='#666' size={16} />
                        <Card.Location location={card.cardLocation} />
                    </Card.IconTextContainer>
                {cardType === "campaigns" ? <Card.Contribution quantityContribution={card.contribuition || 0} /> : null} 
                </Container></Link>
                <Edit05 className={`icon ${styles.editIcon}`} color='#000' size={16} onClick={() => navigate({to: `/${cardType}/edit/${card.cardId}`})} />
            </Card.Root>
        
    )
}
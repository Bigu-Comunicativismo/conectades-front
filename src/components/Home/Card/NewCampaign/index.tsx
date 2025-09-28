import { Card } from "@/components/structuralComponents/Card";
import { SpanText } from '@/components/structuralComponents/SpanText';
import { HeartHand, MarkerPin01 } from '@untitledui/icons';
import { Avatar } from '@/components/base/avatar/avatar';
import { Badge } from '@/components/base/badges/badges';
import styles from '../Card.module.css';

type cardAuthor = {
  authorName: string; 
  authorImage: string;
}

type cardContribution = {
  quantityContribution: number;
}

interface CardProps {
  cardId: number;
  cardName: string;
  cardImage: string;
  cardLocation: string;
  cardAuthor: cardAuthor;
  cardTag: string;
  cardContribution: cardContribution;
}

export function NewCampaignCard({cardList}: {cardList: CardProps[]}) {
    return (
        <div className={styles.cardContainer}>
          {cardList.map(card => (
            
        <Card.Root key={card.cardId}>
          <Card.InforContainer cardGap='gap16'>
            <Card.CardImage src={card.cardImage} alternateText={`Imagem da campanha ${card.cardName} do usuário ${card.cardAuthor.authorName}`} className={styles.foto} />
            <Card.InforContainer>
              <Badge className={styles.badge} color="purple">{card.cardTag}</Badge>
              <Card.InforContainer cardGap='gap4'>
                <SpanText text={card.cardName}  />
                <Card.IconTextContainer>
                  <Avatar size='xs' src={card.cardAuthor.authorImage} alt={`Avatar do usuário ${card.cardAuthor.authorName}`} className={styles.avatar} />
                  <Card.Author name={card.cardAuthor.authorName} />
                </Card.IconTextContainer>
                <Card.IconTextContainer>
                  <MarkerPin01 className="icon" color='#666' size={15} />
                  <Card.Location location={card.cardLocation} />
                </Card.IconTextContainer>
              </Card.InforContainer>
            </Card.InforContainer>
          </Card.InforContainer>
          <Card.IconTextContainer>
            <HeartHand className="icon" color='#9c59d1'/>
            <Card.Contribution quantityContribution={card.cardContribution.quantityContribution} />
          </Card.IconTextContainer>
        </Card.Root>
          ))}
        </div>
    );
}
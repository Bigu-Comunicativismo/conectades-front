import { Card } from "@/components/structuralComponents/Card";
import { SpanText } from '@/components/structuralComponents/SpanText';
import { Avatar } from '@/components/base/avatar/avatar';
import { Badge } from '@/components/base/badges/badges';
import styles from '../Card.module.css';
import { MarkerPin01 } from "@untitledui/icons";
import { Link } from "@tanstack/react-router";

type cardAuthor = {
  authorName: string; 
  authorImage: string;
}

interface CardProps {
  cardId: number;
  cardName: string;
  cardImage: string;
  cardLocation: string;
  cardAuthor: cardAuthor;
  cardTag: string;
}

export function CausesCard({cardList, cardType, classCss = ''}: {cardList: CardProps[], cardType: 'donations' | 'opportunities', classCss?: string}) {
    return (
        <div  className={`${styles.cardContainer} ${classCss}`}>
          {cardList.map(card => (
            <Link to={`/${cardType}/$id`} key={card.cardId} params={{ id: String(card.cardId) }}>
              <Card.Root key={card.cardId}>
                <Card.InforContainer cardGap='gap16'>
                  <Card.CardImage src={card.cardImage} alternateText={`Imagem da ${cardType === 'donations' ? 'doação' : 'oportunidade'} ${card.cardName} do usuário ${card.cardAuthor.authorName}`} className={styles.foto} />
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
              </Card.Root>
            </Link>
      ))}
        </div>
    );
}
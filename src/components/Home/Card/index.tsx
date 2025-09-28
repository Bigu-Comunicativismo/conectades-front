import { Card } from "@/components/structuralComponents/Card";
import { SpanText } from '@/components/structuralComponents/SpanText';
import womanUserAvatar from '@/assets/Assets Visuais/userwoman.png';
import campanha from '@/assets/Assets Visuais/Frame 489.png';
import { HeartHand, MarkerPin01 } from '@untitledui/icons';
import { Avatar } from '@/components/base/avatar/avatar';
import { Badge } from '@/components/base/badges/badges';
import styles from './Card.module.css';


export function HomeCard() {
    return (
        <Card.Root>
          <Card.InforContainer cardGap='gap16'>
            <Card.CardImage src={campanha} alternateText="Imagem de campanha X" className={styles.foto} />
            <Card.InforContainer>
              <Badge className={styles.badge} color="purple">Trabalho</Badge>
              <Card.InforContainer cardGap='gap4'>
                <SpanText text="Equipamentos para confei"  />
                <Card.IconTextContainer>
                  <Avatar size='xs' src={womanUserAvatar} alt='User X avatar' className={styles.avatar} />
                  <Card.Author />
                </Card.IconTextContainer>
                <Card.IconTextContainer>
                  <MarkerPin01 className="icon" color='#666' size={15} />
                  <Card.Location location="São Paulo, SP" />
                </Card.IconTextContainer>
              </Card.InforContainer>
            </Card.InforContainer>
          </Card.InforContainer>
          <Card.IconTextContainer>
            <HeartHand className="icon" color='#9c59d1'/>
            <Card.Contribution quantityContribution={10} />
          </Card.IconTextContainer>
        </Card.Root>
    );
}
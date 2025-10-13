import { useState, useEffect } from "react";
import { Card } from "@/components/structuralComponents/Card";
import { Paragraph } from "@/components/structuralComponents/Paragraph";
import { ImageIcon } from "@/components/structuralComponents/ImageIcon";
import { Container } from "@/components/structuralComponents/Container";
import { mockApiReturn } from "@/utils/mockapireturn";
import styles from './Card.module.css';
import type { UserType } from "@/components/SignUp/UserTypeForm";

interface ICard {
    id: number;
    title: string;
    description: string;
    iconUrl: string;
}

export function HowItWorksCard({userType}: {userType: UserType}) {
    const [cardList, setCardList] = useState<ICard[]>([]);

    useEffect(() => {
        const cardsData: ICard[] = [];

        mockApiReturn.data.sobreConectades[userType].forEach((card) => {
            const newCard: ICard = {
                id: card.id,
                title: card.title,
                description: card.description,
                iconUrl: card.imageUrl
            };
            cardsData.push(newCard);
        })
        setCardList(cardsData);
    }, [userType]);
    return (
        <Container classCss={`${styles.cardContainer}`}>
            {cardList.map((card) => (
                <Card.Root key={card.id} classCss={`${styles.cardItem}`}>
                    <ImageIcon iconUrl={card.iconUrl} alternateText="Alvo"/>
                    <Paragraph text={card.title} size="lg" weight="semibold" />
                    <Paragraph text={card.description} size="lg" weight="regular" />
                </Card.Root>
            ))}
        </Container>
    );
}
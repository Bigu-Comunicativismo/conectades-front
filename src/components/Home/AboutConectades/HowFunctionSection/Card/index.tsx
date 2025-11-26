import { useState, useEffect } from "react";
import { Card } from "@/components/structuralComponents/Card";
import { Paragraph } from "@/components/structuralComponents/Paragraph";
import { ImageIcon } from "@/components/structuralComponents/ImageIcon";
import { Container } from "@/components/structuralComponents/Container";
import styles from './Card.module.css';
import type { UserType } from "@/components/SignUp/UserTypeForm";
import pointerIcon from "@/assets/Assets Visuais/envato-graphic-7b470398-0cbb-4186-ae3a-1c959bb70162.png"
import okIcon from "@/assets/Assets Visuais/envato-graphic-7e70999d-24f8-4ea0-b4ac-e0913e964091.png"

interface ICard {
    id: number;
    title: string;
    description: string;
    iconUrl: string;
}

const sobreConectades = {
            beneficiaria: [
                {
                id: 1,
                title: "Para quem é?",
                description: "Destinado à mulheres cis, mulheres e homens trans, pessoas não-binarias e travestis com renda de até dois salários mínimos",
                imageUrl: pointerIcon
            },
            {
                id: 2,
                title: "O que você pode fazer?",
                description: "Você enquanto pessoa beneficiária pode criar campanhas, construir um currículo e se candidatar para vagas afirmativas",
                imageUrl: okIcon
            },
            ],
            doadora: [
                {
                id: 1,
                title: "Para quem é?",
                description: "Mulheres e homens cis, que possuam renda a partir de três salários mínimos",
                imageUrl: pointerIcon
            },
            {
                id: 2,
                title: "O que você pode fazer?",
                description: "Você pode oferecer serviços ou fazer doações",
                imageUrl: okIcon
            },
            ]
        }

export function HowItWorksCard({userType, ClassCss}: {userType: UserType, ClassCss?: string}) {
    const [cardList, setCardList] = useState<ICard[]>([]);

    useEffect(() => {
        const cardsData: ICard[] = [];

        sobreConectades[userType === "5" ? "beneficiaria" : "doadora"].forEach((card) => {
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
        <Container classCss={`${styles.cardContainer} ${ClassCss}`}>
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
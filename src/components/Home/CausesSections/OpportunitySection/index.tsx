import { CausesSectionsContainer } from "../CausesSectionsContainer";
import { mockApiReturn } from "@/utils/mockapireturn";
import { useEffect, useState } from "react";
import { CausesCard } from "../../Card/DonationAndOportunity";

type Author = {
    authorName: string;
    authorImage: string;
}

interface OpportunityData {
    cardId: number;
    cardName: string;
    cardImage: string;
    cardLocation: string;
    cardAuthor: Author;
    cardTag: string;
    cardContribution: {
        quantityContribution: number;
    };
}


export function OpportunitySection() {

    const [OpportunityList, setOpportunityList] = useState<OpportunityData[]>([]);

    useEffect(() => {
        const OpportunityList: OpportunityData[] = [];
        mockApiReturn.data.oportunidades.forEach(opportunity => {
            const OpportunityData = {
                cardId: opportunity.id,
                cardName: opportunity.title,
                cardImage: opportunity.imageUrl,
                cardLocation: opportunity.location,
                cardAuthor: {
                    authorName: opportunity.author.name,
                    authorImage: opportunity.author.avatarUrl
                },
                cardTag: opportunity.tag,
                cardContribution: {
                    quantityContribution: opportunity.apoios
                }
            };
            OpportunityList.push(OpportunityData);
        })
        setOpportunityList(OpportunityList);
    }, []);

    return (
        <CausesSectionsContainer causeContainerAriaName="Oportunidades" causeTitle="Oportunidades" causeCallMessage="Veja as oportunidades disponíveis na Conectades" causeUrl="/oportunidades">
            <CausesCard cardList={OpportunityList} cardType='opportunity' />
        </CausesSectionsContainer>
    )
};
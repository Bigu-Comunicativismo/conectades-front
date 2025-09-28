import { CausesSectionsContainer } from "../CausesSectionsContainer";
import { NewCampaignCard } from "../../Card/NewCampaign";
import { mockApiReturn } from "@/utils/mockapireturn";
import { useEffect, useState } from "react";

type Author = {
    authorName: string;
    authorImage: string;
}

interface CampaignData {
    cardId: number;
    cardName: string;
    cardImage: string; 
    cardLocation: string;    
    cardAuthor: Author;
    cardTag: string;
    cardContribution: {
        quantityContribution: number;
    }
}

export function CampaignSection() {

    const [CampaignList, setCampaignList] = useState<CampaignData[]>([]);

    useEffect(() => {
        const CampaignList: CampaignData[] = [];
        mockApiReturn.data.campanhas.forEach(campaign => {
            const campaignData = {
                cardId: campaign.id,
                cardName: campaign.title,
                cardImage: campaign.imageUrl,
                cardLocation: campaign.location,
                cardAuthor: {
                    authorName: campaign.author.name,
                    authorImage: campaign.author.avatarUrl
                },
                cardTag: campaign.tag,
                cardContribution: {
                    quantityContribution: campaign.apoios
                }
            };
            CampaignList.push(campaignData);   
        })
        setCampaignList(CampaignList);
    }, []);

    return (
        <CausesSectionsContainer causeContainerAriaName="Novas campanhas" causeTitle="Novas campanhas" causeCallMessage="Confira as últimas campanhas criadas" causeUrl="/campanhas">
            <NewCampaignCard cardList={CampaignList} />
        </CausesSectionsContainer>
    )
};
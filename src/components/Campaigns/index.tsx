import { useState, useEffect } from "react";
import { Container } from "../structuralComponents/Container";
import { Title } from "../structuralComponents/Title";
import { Input } from "../base/input/input";
import { SearchSm } from "@untitledui/icons";
import { NewCampaignCard } from "../Home/Card/NewCampaign";
import { type CampaignData } from "../Home/CausesSections/CampaignSection";
import inputStyles from "../base/input/Input.module.css";
import styles from "./Campaigns.module.css";
import { mockApiReturn } from "@/utils/mockapireturn";

export function Campaigns() {

    const handleSearch = (searchTerm: string) => {
        setSearchTerm(searchTerm);
        console.log(searchTerm);
        
    };

    const [campaignList, setCampaignList] = useState<CampaignData[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    
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
        <Container classCss={styles.container}>
            <Title.Level1 text="Doações" 
            classCss={styles.title}/>
            <Input type="text" 
            placeholder="Pesquisar" 
            icon={SearchSm}
            className={`${inputStyles.input} ${styles.inputMargin}`} 
            value={searchTerm} 
            onChange={handleSearch}/>
            <NewCampaignCard cardList={campaignList} 
            classCss={styles.donationsContainer} />
        </Container>
    );
}
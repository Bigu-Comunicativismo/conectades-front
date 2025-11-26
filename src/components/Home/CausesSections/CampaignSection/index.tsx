import { CausesSectionsContainer } from "../CausesSectionsContainer";
import { NewCampaignCard } from "../../Card/NewCampaign";
import { useEffect, useState } from "react";
import { apiFetch } from "@/utils/fetchApi";
import { setOptions } from "@/utils/setOptions";
import type { LabedItem } from "@/components/structuralComponents/ListFilter";
import type { CampaignFetched } from "@/pages/campaigns/_Campaign/$id";


type Author = {
    authorName: string;
    authorImage: string;
}

export interface CampaignData {
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

export interface Data {
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

export function CampaignSection({causeTitle="Novas campanhas", causeCallMessage="Confira as últimas campanhas criadas", searchTerm}: {causeTitle?: string, causeCallMessage?: string, searchTerm?: string}) {

    const [CampaignList, setCampaignList] = useState<CampaignData[]>([]);

    useEffect(() => {
        const CampaignList: CampaignData[] = [];
        let categoriesList: LabedItem[] = [];
        const storedCategories = localStorage.getItem('categories');
        if (storedCategories) categoriesList = JSON.parse(storedCategories);
        if (!categoriesList) {
        
            setOptions().then(({categories}) => {
                categoriesList = categories;
            })
            return categoriesList;
        };
        const loadCampaigns = async () => {
            await apiFetch<CampaignFetched[]>({ apiPath: `https://conectades.com.br/api/campanhas/listar?ordenar=recente&busca=${searchTerm}` })
            .then((data) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                data.forEach((campaign: any) => {
                    
                const item = {
                    cardId: campaign.id,
                    cardName: campaign.titulo,
                    cardImage: campaign.imagem_url,
                    cardLocation: `${campaign.organizadora.pessoa.bairro}, ${campaign.organizadora.pessoa.cidade}`,
                    cardAuthor: {
                        authorName: campaign.organizadora.pessoa.nome_social,
                        authorImage: campaign.organizadora.pessoa.avatar,
                    },
                    cardTag: (categoriesList.length > 0 && categoriesList.find((category) => category.id === campaign.categorias.find(() => true))?.label) || '',
                    cardContribution: {
                        quantityContribution: campaign.doacoes.length
                    }
                }
                CampaignList.push(item);
            });
            setCampaignList(CampaignList.slice(0, 6));
            });
            
        }
        loadCampaigns();
    }, [searchTerm]);

    return (
        <CausesSectionsContainer causeContainerAriaName="Campanhas" causeTitle={causeTitle} causeCallMessage={causeCallMessage} causeUrl="/campaigns">
            <NewCampaignCard cardList={CampaignList} />
        </CausesSectionsContainer>
    )
};
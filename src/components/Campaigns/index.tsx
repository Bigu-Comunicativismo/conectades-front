import { useState, useEffect } from "react";
import { Container } from "../structuralComponents/Container";
import { Title } from "../structuralComponents/Title";
import { Input } from "../base/input/input";
import { SearchSm } from "@untitledui/icons";
import { NewCampaignCard } from "../Home/Card/NewCampaign";
import { ListFilter, type LabedItem } from "../structuralComponents/ListFilter";
import { type CampaignData } from "../Home/CausesSections/CampaignSection";
import inputStyles from "../base/input/Input.module.css";
import styles from "./Campaigns.module.css";
import { apiFetch } from "@/utils/fetchApi";
import { useFilterContext } from "@/contexts/filterContext";
import { setOptions } from "@/utils/setOptions";
import type { CampaignFetched } from "@/pages/campaigns/_Campaign/$id";

export function Campaigns() {
    const handleSearch = (searchTerm: string) => {
        setSearchTerm(() => searchTerm);
    };
    const [campaignList, setCampaignList] = useState<CampaignData[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const {selectedItems, selectedLocations} = useFilterContext();

    
    useEffect(() => {
        const CampaignList: CampaignData[] = [];
        const loadCampaigns = async () => {
            let categoriesList: LabedItem[] = [];
            const storedCategories = localStorage.getItem('categories');
            if (storedCategories) categoriesList = JSON.parse(storedCategories);
            if (!categoriesList) {
            
                setOptions().then(({categories}) => {
                    categoriesList = categories;
                })
                return categoriesList;
            };

            await apiFetch<CampaignFetched[]>({ apiPath: 'http://srv1037558.hstgr.cloud:8001/api/campanhas/listar?ordenar=recente' })
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
            setCampaignList(CampaignList);
            });
            
        }
        loadCampaigns();
    }, []);
    useEffect(() => {
        const CampaignList: CampaignData[] = [];
        const loadCampaigns = async () => {
            const filteredCampaigns = await apiFetch<CampaignFetched[]>({ apiPath: `http://srv1037558.hstgr.cloud:8001/api/campanhas/listar?busca=${searchTerm}`});
            let categoriesList: LabedItem[] = [];
            const storedCategories = localStorage.getItem('categories');
            if (storedCategories) categoriesList = JSON.parse(storedCategories);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
            filteredCampaigns.forEach(async (campaign: any) => {
                
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
            setCampaignList(CampaignList);
        }
        setTimeout(() => loadCampaigns(), 500);
    }, [searchTerm]);
    useEffect(() => {
        
    }, [selectedItems, selectedLocations])

    return (
        <Container classCss={styles.container}>
            <Title.Level1 text="Campanhas" 
            classCss={styles.title}/>
            <Input type="text" 
            placeholder="Pesquisar" 
            icon={SearchSm}
            className={`${inputStyles.input} ${styles.inputMargin}`} 
            value={searchTerm} 
            onChange={handleSearch}/>
            <ListFilter />
            <NewCampaignCard cardList={campaignList} 
            classCss={styles.donationsContainer} />
        </Container>
    );
}
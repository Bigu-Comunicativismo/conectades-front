import { useState, useEffect } from "react";
import { Container } from "../structuralComponents/Container";
import { Title } from "../structuralComponents/Title";
import { Input } from "../base/input/input";
import { SearchSm } from "@untitledui/icons";
import { CausesCard } from "../Home/Card/DonationAndOportunity";
import { ListFilter } from "../structuralComponents/ListFilter";
import type { DonationData } from "../Home/CausesSections/DonationSection";
import inputStyles from "../base/input/Input.module.css";
import styles from "./Donations.module.css";

import { useFilterContext } from "@/contexts/filterContext";
import type { BadgeItem, DonationFetched } from "@/pages/donations/_Donation/$id";
import { apiFetch } from "@/utils/fetchApi";
import { Paragraph } from "../structuralComponents/Paragraph";

export function Donations() {

    const handleSearch = (searchTerm: string) => {
        setSearchTerm(() => searchTerm);     
    };

    const [DonationList, setDonationList] = useState<DonationData[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const {selectedItems, selectedLocations} = useFilterContext();
    

    useEffect(() => {
        const DonationList: DonationData[] = [];
        const loadDonations = async () => {
            let categoriesList: BadgeItem[] = [];
                const storedCategories = await apiFetch<BadgeItem[]>({ apiPath: 'https://conectades.com.br/api/doacoes/tipos-servico' });
                if (storedCategories) categoriesList = storedCategories;
                if (!categoriesList) {
                    categoriesList = [];
                };

            await apiFetch<DonationFetched[]>({ apiPath: 'https://conectades.com.br/api/doacoes/independentes?ordenar=recente' })
            .then((data) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                data.forEach((donation: any) => {
                    
                const item = {
                    cardId: donation.id,
                    cardName: donation.titulo,
                    cardImage: donation.imagem_url,
                    cardLocation: `${donation.localizacao_nome}`,
                    cardAuthor: {
                        authorName: donation.doadora.nome_social,
                        authorImage: donation.doadora.avatar,
                    },
                    cardTag: (categoriesList.length > 0 && categoriesList.find((category) => category.id === donation.categorias.find(() => true))?.nome) || '',
                    cardContribution: {
                        quantityContribution: 0
                    }
                }
                DonationList.push(item);
            });
            setDonationList(DonationList);
            });
            
        }
        loadDonations();
        
    }, []);
    useEffect(() => {
        const DonationList: DonationData[] = [];
        const loadDonations = async () => {
            const filteredDonations = await apiFetch<DonationFetched[]>({ apiPath: `https://conectades.com.br/api/doacoes/independentes?busca=${searchTerm}&localizacao=${encodeURIComponent(selectedLocations.map((location) => location.id).join(','))}&categorias=${encodeURIComponent(selectedItems.map((item) => item.id).join(','))}`});
            let categoriesList: BadgeItem[] = [];
            const storedCategories = await apiFetch<BadgeItem[]>({ apiPath: 'https://conectades.com.br/api/doacoes/tipos-servico' });
            if (storedCategories) categoriesList = storedCategories;
            if (!categoriesList) {
                categoriesList = [];
            };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
            filteredDonations.forEach(async (donation: any) => {
                
                const item = {
                    cardId: donation.id,
                    cardName: donation.titulo,
                    cardImage: donation.imagem_url,
                    cardLocation: `${donation.localizacao_nome}`,
                    cardAuthor: {
                        authorName: donation.doadora.nome_social,
                        authorImage: donation.doadora.avatar,
                    },
                    cardTag: (categoriesList.length > 0 && categoriesList.find((category) => category.id === donation.categorias.find(() => true))?.nome) || '',
                    cardContribution: {
                        quantityContribution: 0
                    }
                }
                DonationList.push(item);
                });
            setDonationList(DonationList);
        }
        setTimeout(() => loadDonations(), 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm]);

    useEffect(() => {
                const DonationList: DonationData[] = [];
        const loadDonations = async () => {
            const filteredDonations = await apiFetch<DonationFetched[]>({ apiPath: `https://conectades.com.br/api/doacoes/independentes?busca=${searchTerm}&localizacao=${encodeURIComponent(selectedLocations.map((location) => location.id).join(','))}&categorias=${encodeURIComponent(selectedItems.map((item) => item.id).join(','))}`});
            let categoriesList: BadgeItem[] = [];
            const storedCategories = await apiFetch<BadgeItem[]>({ apiPath: 'https://conectades.com.br/api/doacoes/tipos-servico' });
            if (storedCategories) categoriesList = storedCategories;
            if (!categoriesList) {
                categoriesList = [];
            };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
            filteredDonations.forEach(async (donation: any) => {
                
                const item = {
                    cardId: donation.id,
                    cardName: donation.titulo,
                    cardImage: donation.imagem_url,
                    cardLocation: `${donation.localizacao_nome}`,
                    cardAuthor: {
                        authorName: donation.doadora.nome_social,
                        authorImage: donation.doadora.avatar,
                    },
                    cardTag: (categoriesList.length > 0 && categoriesList.find((category) => category.id === donation.categorias.find(() => true))?.nome) || '',
                    cardContribution: {
                        quantityContribution: 0
                    }
                }
                DonationList.push(item);
                });
            setDonationList(DonationList);
        }

        loadDonations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedItems, selectedLocations])

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
            <ListFilter />
            {(searchTerm.length || selectedItems.length || selectedLocations.length) ? <Paragraph size="sm" weight="medium" text={`${DonationList.length} resultados encontrados`}/> : null}
            <CausesCard cardList={DonationList} 
            classCss={styles.donationsContainer}
            cardType="donations" />
        </Container>
    );
}
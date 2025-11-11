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

export function Donations() {

    const handleSearch = (searchTerm: string) => {
        setSearchTerm(() => searchTerm);     
    };

    const [DonationList, setDonationList] = useState<DonationData[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const {selectedItems, selectedLocations} = useFilterContext();
    
    // useEffect(() => {
    //     const DonationList: DonationData[] = [];
        


    //     mockApiReturn.data.doacoes.forEach(donation => {
    //         const donationData = {
    //             cardId: donation.id,
    //             cardName: donation.title,
    //             cardImage: donation.imageUrl,
    //             cardLocation: donation.location,
    //             cardAuthor: {
    //                 authorName: donation.author.name,
    //                 authorImage: donation.author.avatarUrl
    //             },
    //             cardTag: donation.tag,
    //             cardContribution: {
    //                 quantityContribution: donation.apoios
    //             }
    //         };
    //         DonationList.push(donationData);
    //     })
    //     setDonationList(DonationList);
    // }, []);

    useEffect(() => {
        const DonationList: DonationData[] = [];
        const loadDonations = async () => {
            let categoriesList: BadgeItem[] = [];
                const storedCategories = await apiFetch<BadgeItem[]>({ apiPath: 'http://srv1037558.hstgr.cloud:8001/api/doacoes/tipos-servico' });
                if (storedCategories) categoriesList = storedCategories;
                if (!categoriesList) {
                    categoriesList = [];
                };

            await apiFetch<DonationFetched[]>({ apiPath: 'http://srv1037558.hstgr.cloud:8001/api/doacoes/independentes?ordenar=recente' })
            .then((data) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                data.forEach((donation: any) => {
                    console.log((categoriesList.length > 0 && categoriesList.find((category) => category.id === donation.categorias.find(() => true))?.nome));
                    
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
            const filteredDonations = await apiFetch<DonationFetched[]>({ apiPath: `http://srv1037558.hstgr.cloud:8001/api/doacoes/independentes?busca=${searchTerm}`});
            let categoriesList: BadgeItem[] = [];
            const storedCategories = await apiFetch<BadgeItem[]>({ apiPath: 'http://srv1037558.hstgr.cloud:8001/api/doacoes/tipos-servico' });
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
    }, [searchTerm]);

    useEffect(() => {
    
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
            <CausesCard cardList={DonationList} 
            classCss={styles.donationsContainer}
            cardType="donations" />
        </Container>
    );
}
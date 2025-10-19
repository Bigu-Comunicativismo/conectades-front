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
import { mockApiReturn } from "@/utils/mockapireturn";

export function Donations() {

    const handleSearch = (searchTerm: string) => {
        setSearchTerm(searchTerm);
        console.log(searchTerm);
        
    };

    const [DonationList, setDonationList] = useState<DonationData[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    
        useEffect(() => {
            const DonationList: DonationData[] = [];
            mockApiReturn.data.doacoes.forEach(donation => {
                const donationData = {
                    cardId: donation.id,
                    cardName: donation.title,
                    cardImage: donation.imageUrl,
                    cardLocation: donation.location,
                    cardAuthor: {
                        authorName: donation.author.name,
                        authorImage: donation.author.avatarUrl
                    },
                    cardTag: donation.tag,
                    cardContribution: {
                        quantityContribution: donation.apoios
                    }
                };
                DonationList.push(donationData);
            })
            setDonationList(DonationList);
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
            <ListFilter />
            <CausesCard cardList={DonationList} 
            classCss={styles.donationsContainer}
            cardType="donation" />
        </Container>
    );
}
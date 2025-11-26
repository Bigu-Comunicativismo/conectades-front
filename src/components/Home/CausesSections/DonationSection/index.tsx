import { CausesSectionsContainer } from "../CausesSectionsContainer";
import { useEffect, useState } from "react";
import { CausesCard } from "../../Card/DonationAndOportunity";
import { apiFetch } from "@/utils/fetchApi";
import type { DonationFetched } from "@/pages/donations/_Donation/$id";
import type { BadgeItem } from "@/pages/donations/_Donation/$id";

type Author = {
    authorName: string;
    authorImage: string;
}

export interface DonationData {
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

export function DonationSection({causeTitle="Novas doações", causeCallMessage="Veja as novas doações criadas", searchTerm}: {causeTitle?: string, causeCallMessage?: string, searchTerm?: string}) {

    const [DonationList, setDonationList] = useState<DonationData[]>([]);

    useEffect(() => {
        const DonationList: DonationData[] = [];
        const loadDonations = async () => {
            let categoriesList: BadgeItem[] = [];
                const storedCategories = await apiFetch<BadgeItem[]>({ apiPath: 'https://conectades.com.br/api/doacoes/tipos-servico' });
                if (storedCategories) categoriesList = storedCategories;
                if (!categoriesList) {
                    categoriesList = [];
                };

            await apiFetch<DonationFetched[]>({ apiPath: `https://conectades.com.br/api/doacoes/independentes?ordenar=recente&busca=${searchTerm}` })
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
        
    }, [searchTerm]);

    return (
        <CausesSectionsContainer causeContainerAriaName="Doações" causeTitle={causeTitle} causeCallMessage={causeCallMessage} causeUrl="/donations">
            <CausesCard cardList={DonationList} cardType='donations' />
        </CausesSectionsContainer>
    )
};
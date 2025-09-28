import { CausesSectionsContainer } from "../CausesSectionsContainer";
import { mockApiReturn } from "@/utils/mockapireturn";
import { useEffect, useState } from "react";
import { CausesCard } from "../../Card/DonationAndOportunity";

type Author = {
    authorName: string;
    authorImage: string;
}

interface DonationData {
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

export function DonationSection() {

    const [DonationList, setDonationList] = useState<DonationData[]>([]);

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
        <CausesSectionsContainer causeContainerAriaName="Novas doações" causeTitle="Novas doações" causeCallMessage="Veja as novas doações criadas" causeUrl="/doacoes">
            <CausesCard cardList={DonationList} cardType='donation' />
        </CausesSectionsContainer>
    )
};
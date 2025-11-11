import { imgBaseUrl } from "@/utils/imgBaseUrl";
import { Container } from "../structuralComponents/Container";
import { Image } from "../structuralComponents/Image";
import { Paragraph } from "../structuralComponents/Paragraph";
import { SpanText } from "../structuralComponents/SpanText";
import { Title } from "../structuralComponents/Title";
import { Section } from "../structuralComponents/Section";
import { Edit05, MarkerPin01 } from "@untitledui/icons";
import styles from "./Profile.module.css";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { apiFetch } from "@/utils/fetchApi";
import type { BadgeItem } from "@/pages/donations/_Donation/$id";
import { CausesCard } from "../Home/Card/DonationAndOportunity";
import { Card } from "../structuralComponents/Card";

type User = {
    id: number;
    nome_social: string;
    avatar: string;
    bairro: string;
    cidade: string;
    mini_bio: string;
    tipo_usuario: number;
}

type Author = {
    authorName: string;
    authorImage: string;
}

export interface CauseData {
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

export function Profile({userInfo}:{userInfo:User}) {
    const [myCauses, setMyCauses] = useState<CauseData[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        const {refresh} = JSON.parse(localStorage.getItem("tokens")!);
        apiFetch<{ access: string}>({ apiPath: "http://srv1037558.hstgr.cloud:8001/api/token/refresh/", apiMethod: "POST", apiHeaders: { "Content-Type": "application/json" }, apiBody: { refresh: refresh } }).then((data: { access: string}) => {
            localStorage.setItem("tokens", JSON.stringify({ refresh, access: data.access }));
        })
        const userPath = userInfo.tipo_usuario === 5 ? "http://srv1037558.hstgr.cloud:8001/api/campanhas/minhas/" : "http://srv1037558.hstgr.cloud:8001/api/doacoes/independentes/minhas/";
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        apiFetch({ apiPath: userPath, apiHeaders: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem("tokens")!).access}` }}).then(async (data: any) => {

            let categoriesList: BadgeItem[] = [];
            const storedCategories = await apiFetch<BadgeItem[]>({ apiPath: 'http://srv1037558.hstgr.cloud:8001/api/doacoes/tipos-servico' });
            if (storedCategories) categoriesList = storedCategories;
            if (!categoriesList) {
                categoriesList = [];
            };
            const causeList: CauseData[] = []; 
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data.forEach(async (cause: any) => {
                const item = {
                    cardId: cause.id,
                    cardName: cause.titulo,
                    cardImage: cause.imagem_url,
                    cardLocation: `${cause.localizacao_nome}`,
                    cardAuthor: {
                        authorName: cause.doadora.nome_social,
                        authorImage: cause.doadora.avatar,
                    },
                    cardTag: (categoriesList.length > 0 && categoriesList.find((category) => category.id === cause.categorias.find(() => true))?.nome) || '',
                    cardContribution: {
                        quantityContribution: 0
                    }
                }
                causeList.push(item);
            });
            setMyCauses(causeList);
                
        }).catch((error) => console.log(error));
    }, [])
 return (
   <Container classCss={styles.externalContainer}>
    <Container classCss={styles.editContainer} ariaLabel="Container da imagem do usuário">
        <Image src={`${imgBaseUrl}${userInfo.avatar}`} alternateText={userInfo.nome_social} className={styles.profileImage} />
        <Edit05 size={24} onClick={() => navigate({to: "/profile/edit"})} />
    </Container>
    <Title.Level1 text={userInfo.nome_social} />
    <Container classCss={styles.locationBox}>
        <Card.IconTextContainer>
            <MarkerPin01 className="icon" color="#666" size={16}/>
            <Card.Location location={`${userInfo.bairro}, ${userInfo.cidade}`} />
        </Card.IconTextContainer>
    </Container>
    <Section classCss={`${styles.section} ${styles.about}`} aria-label="Sobre mim">
        <SpanText text="Sobre" />
        <Paragraph text={userInfo.mini_bio} size="md" weight="regular" />
    </Section>
    <Section classCss={`${styles.section} ${styles.causesContainer}`} aria-label={userInfo.tipo_usuario === 5 ? "Minhas campanhas" : "Minhas doações"}>
        <SpanText text={userInfo.tipo_usuario === 5 ? "Campanhas" : "Doações"} classCss={styles.causesTitle}/>
        <Container classCss={styles.causes}>
            {myCauses.length > 0 && <CausesCard cardList={myCauses} cardType='donations' />}
        </Container>
    </Section>
   </Container>
 );
}
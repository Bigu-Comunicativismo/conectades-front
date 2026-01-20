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
import { NewCampaignCard } from "../Home/Card/NewCampaign";

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
        apiFetch<{ access: string}>({ apiPath: "https://conectades.com.br/api/token/refresh/", apiMethod: "POST", apiHeaders: { "Content-Type": "application/json" }, apiBody: { refresh: refresh } }).then((data: { access: string}) => {
            localStorage.setItem("tokens", JSON.stringify({ refresh, access: data.access }));
        })
        const userPath = userInfo.tipo_usuario === 5 ? "https://conectades.com.br/api/campanhas/minhas/" : "https://conectades.com.br/api/doacoes/independentes/minhas/";
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        apiFetch({ apiPath: userPath, apiHeaders: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem("tokens")!).access}` }}).then(async (data: any) => {

            let categoriesList: BadgeItem[] = [];
            const storedCategories = await apiFetch<BadgeItem[]>({ apiPath: 'https://conectades.com.br/api/doacoes/tipos-servico' });
            if (storedCategories) categoriesList = storedCategories;
            if (!categoriesList) {
                categoriesList = [];
            };
            const causeList: CauseData[] = []; 
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data.forEach(async (cause: any) => {
                if(userInfo.tipo_usuario === 6){
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
            }
            else{
                const item = {
                    cardId: cause.id,
                    cardName: cause.titulo,
                    cardImage: cause.imagem_url,
                    cardLocation: `${cause.organizadora.pessoa.bairro}, ${cause.organizadora.pessoa.cidade}`,
                    cardAuthor: {
                        authorName: cause.organizadora.pessoa.nome_social,
                        authorImage: cause.organizadora.pessoa.avatar,
                    },
                    cardTag: (categoriesList.length > 0 && categoriesList.find((category) => category.id === cause.categorias.find(() => true))?.nome) || '',
                    cardContribution: {
                        quantityContribution: cause.doacoes?.length ?? 0
                    }
                }
                causeList.push(item);
            }
            });
            setMyCauses(causeList);
                
        }).catch((error) => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
 return (
   <Container classCss={styles.externalContainer}>
    <div className={styles.mobileInfoContainer}>
        <Container classCss={styles.editContainer} ariaLabel="Container da imagem do usuário">
            <Image src={`${imgBaseUrl}${userInfo.avatar}`} alternateText={userInfo.nome_social} className={styles.profileImage} />
            <Edit05 size={24} onClick={() => navigate({to: "/profile/edit"})} aria-hidden="false" aria-label="botão editar perfil" />
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
    </div>
    <div className={styles.desktopInfoContainer}>
        <Container classCss={styles.editContainer} ariaLabel="Container da imagem do usuário">
            <Image src={`${imgBaseUrl}${userInfo.avatar}`} alternateText={userInfo.nome_social} className={styles.profileImage} />
        </Container>
        <div>
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
        </div>
        <Edit05 size={24} onClick={() => navigate({to: "/profile/edit"})} aria-hidden="false" aria-label="botão editar perfil"/>
    </div>
    <Section classCss={`${styles.section} ${styles.causesContainer}`} aria-label={userInfo.tipo_usuario === 5 ? "Minhas campanhas" : "Minhas doações"}>
        <SpanText text={userInfo.tipo_usuario === 5 ? "Campanhas" : "Doações"} classCss={styles.causesTitle}/>
        <Container classCss={styles.causes}>
            {myCauses.length > 0 && userInfo.tipo_usuario === 5 ? <NewCampaignCard cardList={myCauses} /> : <CausesCard cardList={myCauses} cardType='donations' />}
        </Container>
    </Section>
   </Container>
 );
}
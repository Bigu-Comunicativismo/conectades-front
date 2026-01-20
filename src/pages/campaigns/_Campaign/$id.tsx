import { useTabContext } from "@/contexts/campaign";
import { CampaignDetails } from "@/components/Campaign/Details";
import { Section } from "@/components/structuralComponents/Section";
import { Container } from "@/components/structuralComponents/Container";
import { Badge } from "@/components/base/badges/badges";
import { Image } from "@/components/structuralComponents/Image";
import { Title } from "@/components/structuralComponents/Title";
import { Card } from "@/components/structuralComponents/Card";
import { Paragraph } from "@/components/structuralComponents/Paragraph";
import { MarkerPin01, Edit05 } from "@untitledui/icons";
import styles from "./Campaign.module.css";
import { TabNav } from "@/components/Campaign/TabNav";
import { About } from "@/components/Campaign/Tabs/About";
import { Organization } from "@/components/Campaign/Tabs/Organization";
import { Supports } from "@/components/Campaign/Tabs/Supports";
// import { Updates } from "@/components/Campaign/Tabs/Updates";
// import type { User } from "@/components/Campaign/Tabs/Organization/Profile";
// import type { Contribuition } from "@/components/Campaign/Tabs/Supports/Message";
// import type { updatePost } from "@/components/Campaign/Tabs/Updates/UpdatePost";
import { ButtonGroupFloating } from "@/components/structuralComponents/ButtonGroupFloating";
import { useEffect, useRef, useState } from "react";
import { createFileRoute, useLoaderData, useNavigate } from "@tanstack/react-router";
import { apiFetch } from "@/utils/fetchApi";
import { imgBaseUrl } from "@/utils/imgBaseUrl";
import { setOptions } from "@/utils/setOptions";
import type { LabedItem } from "@/components/structuralComponents/ListFilter";
import { DonationModal } from "@/components/Campaign/DonationModal";
import { useLoggedUserContext } from "@/contexts/loggedUserContext";
import { ButtonGroupFixed } from "@/components/structuralComponents/ButtonGroupFixed";

export interface CampaignFetched {
  id: string;
  titulo: string;
  imagem_url: string;
  categorias: [];
  subtitulo: string;
  dias_restantes: number;
  itens: [];
  doacoes: [];
  descricao: string;
  organizadora: {pessoa: {id:number, avatar: string, tipo_usuario: string, telefone: string, bairro: string, cidade: string, nome_completo: string, nome_exibicao: string}};
  whatsapp: string;
}

export const Route = createFileRoute('/campaigns/_Campaign/$id')({
    component: Campaign,
    loader: async ({ params }) => {
        const campaignId = Number(params.id)
        const campaignFetched: CampaignFetched = await apiFetch<CampaignFetched>({ apiPath: `https://conectades.com.br/api/campanhas/${campaignId}` })
        .catch(() => {
          const navigate = useNavigate();
          navigate({ to: '/error' });
          return {} as CampaignFetched;
        });

        let categoriesList: LabedItem[] = [];
        const storedCategories = localStorage.getItem('categories');
        if (storedCategories) categoriesList = JSON.parse(storedCategories);
        if (!categoriesList) {
        
            setOptions().then(({categories}) => {
                categoriesList = categories;
            })
        };
        return { campaignFetched, categoriesList };
    }
});


export function Campaign() {
  const {activeItem} = useTabContext();
  const navigate = useNavigate();
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [isOnFocus, setIsOnFocus] = useState(true);
  const [allowEdit, setAllowEdit] = useState(false);
  const [allowDonate, setAllowDonate] = useState(false);
  const {loggedUser} = useLoggedUserContext()
  const activeSection = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(loggedUser?.user) {
      if(campaignFetched.organizadora.pessoa.id === loggedUser?.user.id) {
        setAllowEdit(true);
      }
      if(loggedUser?.user.tipo_usuario === 6) return setAllowDonate(true);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
        setIsOnFocus(entry.isIntersecting);
      }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
      });
      
    observer.observe(activeSection.current!);

    return () => {observer.disconnect();}

  }, [activeSection]);

  const {campaignFetched, categoriesList} = useLoaderData({from: "/campaigns/_Campaign/$id"});

  return (
      <Section classCss={styles.campaignSection} ref={activeSection}>
         <div className={styles.mobileContainer}>
        {(isOnFocus && allowDonate) && <ButtonGroupFloating btn1Text="Copiar link" btn2Text="Apoiar esta causa" btn1Action={async () => {
          await navigator.clipboard.writeText(window.location.href);
          alert("Link copiado com sucesso!");
        }}
         btn2Action={() => {
          setShowDonationModal((prev) => !prev);
         }}/>}
        {(!!loggedUser?.user === false && isOnFocus) && <ButtonGroupFloating btn1Text="Copiar link" btn2Text="Apoiar esta causa" btn1Action={async () => {
          await navigator.clipboard.writeText(window.location.href);
          alert("Link copiado com sucesso!");
        }}
         btn2Action={() => {
          navigate({ to: '/login' });
         }}/>}
          {campaignFetched.imagem_url ? <Image alternateText={`Capa de capa da campanha ${campaignFetched.titulo}`} src={`${imgBaseUrl}${campaignFetched.imagem_url}`} className={styles.campaignImg}/> : <div className={`${styles.campaignImg} ${styles.withoutImg}`}>Campanha sem capa</div>}
          <Container classCss={styles.campaignContainer}>
              <Container classCss={styles.badgeContainer}>
                <Badge color="purple" type="pill-color" size="lg" className={styles.campaignBadge}>{categoriesList.find((category) => category.id === campaignFetched.categorias.find(() => true))?.label}</Badge>
                {allowEdit && <Edit05 onClick={() => {
                  navigate({ to: `/campaigns/edit/${campaignFetched.id}` });
                }}/>}
              </Container>
              <Title.Level1 text={campaignFetched.titulo} classCss={styles.title}/>
              <Paragraph size="lg" text={campaignFetched.subtitulo}/>
              <Card.IconTextContainer>
                  <MarkerPin01 className="icon" color='#666' size={24} />
                  <Paragraph text={`${campaignFetched.organizadora.pessoa.bairro}, ${campaignFetched.organizadora.pessoa.cidade}`} size="lg" variant="secondary"/>
              </Card.IconTextContainer>
          </Container>
          <Container classCss={styles.campaignDetailContainer}>
              <CampaignDetails daysRemaining={campaignFetched.dias_restantes} solicitedItems={campaignFetched.itens} contributions={campaignFetched.doacoes.length}/>
          </Container>
          <TabNav tabList={[{ id:1, name:'Sobre' }, { id:2, name:'Organização'}, { id:3, name:'Apoios'}]}/>
          <Container classCss={styles.campaignContainer}>
              {activeItem === 'Sobre' ? <About campaign={campaignFetched.descricao}/> : activeItem === 'Organização' ? <Organization organizator={{name: campaignFetched.organizadora.pessoa.nome_exibicao, avatar: `${campaignFetched.organizadora.pessoa.avatar}`, location: `${campaignFetched.organizadora.pessoa.bairro}, ${campaignFetched.organizadora.pessoa.cidade}`, type: campaignFetched.organizadora.pessoa.tipo_usuario, contact: campaignFetched.organizadora.pessoa.telefone}}/> : activeItem === 'Apoios' ? <Supports supports={campaignFetched.doacoes}/> : null}
          </Container>
         </div>
         <div className={styles.desktopContainer}>
          <div className={styles.infoCampaignContainer}>
          {campaignFetched.imagem_url ? <Image alternateText={`Capa de capa da campanha ${campaignFetched.titulo}`} src={`${imgBaseUrl}${campaignFetched.imagem_url}`} className={styles.campaignImg}/> : <div className={`${styles.campaignImg} ${styles.withoutImg}`}>Campanha sem capa</div>}
          <TabNav tabList={[{ id:1, name:'Sobre' }, { id:2, name:'Organização'}, { id:3, name:'Apoios'}]}/>
          <Container classCss={styles.campaignContainer}>
              {activeItem === 'Sobre' ? <About campaign={campaignFetched.descricao}/> : activeItem === 'Organização' ? <Organization organizator={{name: campaignFetched.organizadora.pessoa.nome_exibicao, avatar: `${campaignFetched.organizadora.pessoa.avatar}`, location: `${campaignFetched.organizadora.pessoa.bairro}, ${campaignFetched.organizadora.pessoa.cidade}`, type: campaignFetched.organizadora.pessoa.tipo_usuario, contact: campaignFetched.organizadora.pessoa.telefone}}/> : activeItem === 'Apoios' ? <Supports supports={campaignFetched.doacoes}/> : null}
          </Container>
          </div>
          <div className={styles.suportContainer}>
          <Container classCss={styles.campaignContainer}>
              <Container classCss={styles.badgeContainer}>
                <Badge color="purple" type="pill-color" size="lg" className={styles.campaignBadge}>{categoriesList.find((category) => category.id === campaignFetched.categorias.find(() => true))?.label}</Badge>
                {allowEdit && <Edit05 onClick={() => {
                  navigate({ to: `/campaigns/edit/${campaignFetched.id}` });
                }}/>}
              </Container>
              <Title.Level1 text={campaignFetched.titulo} classCss={styles.title}/>
              <Paragraph size="lg" text={campaignFetched.subtitulo}/>
              <Card.IconTextContainer>
                  <MarkerPin01 className="icon" color='#666' size={24} />
                  <Paragraph text={`${campaignFetched.organizadora.pessoa.bairro}, ${campaignFetched.organizadora.pessoa.cidade}`} size="lg" variant="secondary"/>
              </Card.IconTextContainer>
          </Container>
          <Container classCss={styles.campaignContainer}>
              <CampaignDetails daysRemaining={campaignFetched.dias_restantes} solicitedItems={campaignFetched.itens} contributions={campaignFetched.doacoes.length}/>
          </Container>
          {(allowDonate) && <ButtonGroupFixed btn1Text="Copiar link" btn2Text="Apoiar esta causa" btn1Action={async () => {
          await navigator.clipboard.writeText(window.location.href);
          alert("Link copiado com sucesso!");
        }}
         btn2Action={() => {
          setShowDonationModal((prev) => !prev);
         }}/>}
        {(!!loggedUser?.user === false) && <ButtonGroupFixed btn1Text="Copiar link" btn2Text="Apoiar esta causa" btn1Action={async () => {
          await navigator.clipboard.writeText(window.location.href);
          alert("Link copiado com sucesso!");
        }}
         btn2Action={() => {
          navigate({ to: '/login' });
         }}/>}
          </div>
         </div>
        {showDonationModal && <DonationModal setShowDonationModal={setShowDonationModal} 
        items={campaignFetched.itens}
        whatsapp={campaignFetched.whatsapp} />}
      </Section>
  );
}

// <Updates updates={updatePosts}/>
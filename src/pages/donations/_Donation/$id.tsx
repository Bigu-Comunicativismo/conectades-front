import { useTabContext } from "@/contexts/campaign";
import { Section } from "@/components/structuralComponents/Section";
import { Container } from "@/components/structuralComponents/Container";
import { Badge } from "@/components/base/badges/badges";
import { Image } from "@/components/structuralComponents/Image";
import { Title } from "@/components/structuralComponents/Title";
import { Card } from "@/components/structuralComponents/Card";
import { Paragraph } from "@/components/structuralComponents/Paragraph";
import { Edit05, MarkerPin01 } from "@untitledui/icons";
import styles from "@/pages/campaigns/_Campaign/Campaign.module.css";
import dStyles from "./Donation.module.css";
import { TabNav } from "@/components/Campaign/TabNav";
import { About } from "@/components/Campaign/Tabs/About";
import { Organization } from "@/components/Campaign/Tabs/Organization";
import { ButtonGroupFloating } from "@/components/structuralComponents/ButtonGroupFloating";
import { useEffect, useRef, useState } from "react";
import { createFileRoute, useLoaderData, useNavigate } from "@tanstack/react-router";
import { apiFetch } from "@/utils/fetchApi";
import { imgBaseUrl } from "@/utils/imgBaseUrl";
import { useLoggedUserContext } from "@/contexts/loggedUserContext";
import { ReceiveModal } from "@/components/Donation/ReceiveModal";
import { ButtonGroupFixed } from "@/components/structuralComponents/ButtonGroupFixed";

export type BadgeItem = {
  id: string;
  nome: string;
}

type doadora = {
  id:number, 
  nome_completo: string, 
  nome_social: string
  avatar: string, 
  tipo_usuario: string, 
  telefone: string, 
  bairro: string, 
  cidade: string, 
}

export interface DonationFetched {
  id: string;
  titulo: string;
  imagem_url: string;
  imagem_alt: string;
  subtitulo: string;
  descricao: string;
  doadora: doadora;
  doadora_nome: string;
  data_criacao: string;
  data_fim: string;
  whatsapp: string;
  localizacao: string;
  localizacao_nome: string;
  categorias: [];
}

export const Route = createFileRoute('/donations/_Donation/$id')({
    component: Donation,
    loader: async ({ params }) => {
            const campaignId = Number(params.id)
            const DonationFetched: DonationFetched = await apiFetch<DonationFetched>({ apiPath: `https://conectades.com.br/api/doacoes/independentes/${campaignId}` })
            .catch(() => {
              const navigate = useNavigate();
              navigate({ to: '/error' });
              return {} as DonationFetched;
            });
    
            let categoriesList: BadgeItem[] = [];
            const storedCategories = await apiFetch<BadgeItem[]>({ apiPath: 'https://conectades.com.br/api/doacoes/tipos-servico' });
            if (storedCategories) categoriesList = storedCategories;
            if (!categoriesList) {
              categoriesList = [];
            };
            return { DonationFetched, categoriesList };
        }
});


export function Donation() {
  const {activeItem} = useTabContext();
  const navigate = useNavigate();
  const [isOnFocus, setIsOnFocus] = useState(true);
  const activeSection = useRef<HTMLDivElement>(null);
  const { DonationFetched, categoriesList } = useLoaderData({from: "/donations/_Donation/$id"});
  const {loggedUser} = useLoggedUserContext()
  const [allowEdit, setAllowEdit] = useState(false);
  const [allowReceive, setAllowReceive] = useState(false);
  const [showReceiveModal, setShowReceiveModal] = useState(false);

  useEffect(() => {
    if(loggedUser?.user) {
      if(DonationFetched.doadora.id === loggedUser?.user.id) {
        setAllowEdit(true);
      }
      if(loggedUser?.user.tipo_usuario === 5) return setAllowReceive(true);
    }    
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
        setIsOnFocus(entry.isIntersecting);
      }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
      });
      
    observer.observe(activeSection.current!);

  }, [activeSection]);

  return (
      <Section classCss={styles.campaignSection} ref={activeSection}>
        <div className={styles.mobileContainer}>
        {(isOnFocus && allowReceive) && <ButtonGroupFloating btn1Text="Copiar link" btn2Text="Receber doação" btn1Action={async () => {
          await navigator.clipboard.writeText(window.location.href);
          alert("Link copiado com sucesso!")}} btn2Action={() => setShowReceiveModal((prev) => !prev)}/>}
        {(!!loggedUser?.user === false && isOnFocus) && <ButtonGroupFloating btn1Text="Copiar link" btn2Text="Receber doação" btn1Action={async () => {
          await navigator.clipboard.writeText(window.location.href);
          alert("Link copiado com sucesso!");
        }}
         btn2Action={() => {
          navigate({ to: '/login' });
         }}/>}
        {DonationFetched.imagem_url ?<Image alternateText="" src={`${imgBaseUrl}${DonationFetched.imagem_url}`} className={styles.campaignImg}/> : <div className={`${styles.campaignImg} ${styles.withoutImg}`}>Campanha sem capa</div>}
        <Container classCss={`${styles.campaignContainer} ${dStyles.donationContainer}`}>
          <Container classCss={styles.badgeContainer}>
            {DonationFetched.categorias.length > 0 && <Badge color="purple" type="pill-color" size="lg" className={styles.campaignBadge}>{categoriesList.find((category) => category.id === DonationFetched.categorias.find(() => true))?.nome}</Badge>}
            {allowEdit && <Edit05 onClick={() => {
                navigate({ to: `/donations/edit/${DonationFetched.id}` });
              }}/>}
          </Container>
            <Title.Level1 text={DonationFetched.titulo} classCss={styles.title}/>
            <Paragraph size="lg" text={DonationFetched.subtitulo}/>
            <Card.IconTextContainer>
                <MarkerPin01 className="icon" color='#666' size={24} />
                <Paragraph text={DonationFetched.localizacao_nome} size="lg" variant="secondary"/>
            </Card.IconTextContainer>
        </Container>
        <TabNav tabList={[{ id:1, name:'Sobre' }, { id:2, name:'Organização'}]} />
        <Container classCss={styles.campaignContainer}>
            {activeItem === 'Sobre' ? <About campaign={DonationFetched.descricao}/> : activeItem === 'Organização' ? <Organization organizator={{name: DonationFetched.doadora_nome, avatar: DonationFetched.doadora.avatar, location: `${DonationFetched.doadora.bairro}, ${DonationFetched.doadora.cidade}`, type: DonationFetched.doadora.tipo_usuario, contact: DonationFetched.doadora.telefone}}/> : null}
        </Container>
        </div>
        <div className={styles.desktopContainer}>
          <div className={styles.infoCampaignContainer}>
            {DonationFetched.imagem_url ?<Image alternateText="" src={`${imgBaseUrl}${DonationFetched.imagem_url}`} className={styles.campaignImg}/> : <div className={`${styles.campaignImg} ${styles.withoutImg}`}>Campanha sem capa</div>}
            <TabNav tabList={[{ id:1, name:'Sobre' }, { id:2, name:'Organização'}]} />
            <Container classCss={styles.campaignContainer}>
              {activeItem === 'Sobre' ? <About campaign={DonationFetched.descricao}/> : activeItem === 'Organização' ? <Organization organizator={{name: DonationFetched.doadora_nome, avatar: DonationFetched.doadora.avatar, location: `${DonationFetched.doadora.bairro}, ${DonationFetched.doadora.cidade}`, type: DonationFetched.doadora.tipo_usuario, contact: DonationFetched.doadora.telefone}}/> : null}
            </Container>
          </div>
          <div className={styles.suportContainer}>
            <Container classCss={`${styles.campaignContainer} ${dStyles.donationContainer}`}>
              <Container classCss={styles.badgeContainer}>
                {DonationFetched.categorias.length > 0 && <Badge color="purple" type="pill-color" size="lg" className={styles.campaignBadge}>{categoriesList.find((category) => category.id === DonationFetched.categorias.find(() => true))?.nome}</Badge>}
                {allowEdit && <Edit05 onClick={() => {
                    navigate({ to: `/donations/edit/${DonationFetched.id}` });
                  }}/>}
              </Container>
                <Title.Level1 text={DonationFetched.titulo} classCss={styles.title}/>
                <Paragraph size="lg" text={DonationFetched.subtitulo}/>
                <Card.IconTextContainer>
                    <MarkerPin01 className="icon" color='#666' size={24} />
                    <Paragraph text={DonationFetched.localizacao_nome} size="lg" variant="secondary"/>
                </Card.IconTextContainer>
            </Container>
            {(allowReceive) && <ButtonGroupFixed btn1Text="Copiar link" btn2Text="Receber doação" btn1Action={async () => {
              await navigator.clipboard.writeText(window.location.href);
              alert("Link copiado com sucesso!")}} btn2Action={() => setShowReceiveModal((prev) => !prev)}/>}
            {(!!loggedUser?.user === false) && <ButtonGroupFixed btn1Text="Copiar link" btn2Text="Apoiar esta causa" btn1Action={async () => {
            await navigator.clipboard.writeText(window.location.href);
            alert("Link copiado com sucesso!");
            }}
         btn2Action={() => {
          navigate({ to: '/login' });
         }}/>}
          </div>
        </div>
        {showReceiveModal && <ReceiveModal setShowReceiveModal={setShowReceiveModal} 
        whatsapp={DonationFetched.whatsapp} />}
      </Section>
  );
}
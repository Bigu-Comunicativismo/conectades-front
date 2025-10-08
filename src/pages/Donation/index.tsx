import { useTabContext } from "@/contexts/campaign";
import { Section } from "@/components/structuralComponents/Section";
import { Container } from "@/components/structuralComponents/Container";
import { Badge } from "@/components/base/badges/badges";
import { Image } from "@/components/structuralComponents/Image";
import { Title } from "@/components/structuralComponents/Title";
import { Card } from "@/components/structuralComponents/Card";
import { Paragraph } from "@/components/structuralComponents/Paragraph";
import { MarkerPin01 } from "@untitledui/icons";
import styles from "../Campaign/Campaign.module.css";
import dStyles from "./Donation.module.css";
import boleira from "@/assets/Assets Visuais/Frame 489.png"
import { TabNav } from "@/components/Campaign/TabNav";
import { About } from "@/components/Campaign/Tabs/About";
import { Organization } from "@/components/Campaign/Tabs/Organization";
import { Supports } from "@/components/Campaign/Tabs/Supports";
import { Updates } from "@/components/Campaign/Tabs/Updates";
import { mockApiReturn } from "@/utils/mockapireturn";
import type { User } from "@/components/Campaign/Tabs/Organization/Profile";
import type { Contribuition } from "@/components/Campaign/Tabs/Supports/Message";
import type { updatePost } from "@/components/Campaign/Tabs/Updates/UpdatePost";
import { ButtonGroupFloating } from "@/components/structuralComponents/ButtonGroupFloating";
import { useEffect, useRef, useState } from "react";


   const donation = {
    id: mockApiReturn.data.doacoes[0].id,
    description: mockApiReturn.data.doacoes[0].description,
    coverImageUrl: mockApiReturn.data.doacoes[0].imageUrl,
    bottomImageUrl: mockApiReturn.data.doacoes[0].imageUrl,
    alternateText: mockApiReturn.data.doacoes[0].title
  };

  const causeOneOrganization: User[] = [
    {
    name: "Luana Cruz",
    avatar:"src/assets/Assets Visuais/user.png",
    url: "https://google.com",
    location: "Coque, Recife",
    type: "Pessoa organizadora",
    contact: "https://google.com"
    },
    {
    name: "Manuela Goes",
    avatar: "",
    url: "https://google.com",
    location: "Coque, Recife",
    type: "Pessoa beneficiária",
    contact: "https://google.com"
    }
]

const causeOneSupports: Contribuition[] = [
    {
    id: 1,
    message: "Todo sucesso na sua trajetória, Luana!",
    user: {
      name: "Fernanda A.",
      avatar:"src/assets/Assets Visuais/user.png",
      url: "https://google.com",
      location: "Coque, Recife",
      type: "Pessoa organizadora",
      contact: "https://google.com"
    }
    },
    {
    id: 2,
    message: "Estamos Juntes!",
    user: null
    }
]

const updatePosts: updatePost[] = [
  {
    id: 1,
    date: "27/08/2025",
    image: {
      url: "src/assets/Assets Visuais/bolo2.png",
      alternateText: "Bolo de aniversário"
    },
    text: "Consegui fazer o meu primeiro bolo, graças ao apoio de vocês!"
  },{
    id: 2,
    date: "25/08/2025",
    image: null,
    text: "Gente, obrigado demais pelo apoio! Vocês são incríveis! Nunca imaginaria me conectar com pessoas tão incríveis!"
  }
]

export function Donation() {
  
  const {activeItem} = useTabContext();
  const [isOnFocus, setIsOnFocus] = useState(true);
  const activeSection = useRef<HTMLDivElement>(null);

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
        {isOnFocus && <ButtonGroupFloating />}
        <Image alternateText="" src={boleira} className={styles.campaignImg}/>
        <Container classCss={`${styles.campaignContainer} ${dStyles.donationContainer}`}>
            <Badge color="purple" type="pill-color" size="lg" className={styles.campaignBadge}>Trabalho</Badge>
            <Title.Level1 text="Equipamentos para confeitaria" classCss={styles.title}/>
            <Paragraph size="lg" text="Me ajude a abrir minha confeitaria"/>
            <Card.IconTextContainer>
                <MarkerPin01 className="icon" color='#666' size={24} />
                <Paragraph text="Coque, Recife" size="lg" variant="secondary"/>
            </Card.IconTextContainer>
        </Container>
        <TabNav tabList={[{ id:1, name:'Sobre' }, { id:2, name:'Organização'}]} />
        <Container classCss={styles.campaignContainer}>
            {activeItem === 'Sobre' ? <About campaign={donation}/> : activeItem === 'Organização' ? <Organization organizator={causeOneOrganization}/> : activeItem === 'Apoios' ? <Supports supports={causeOneSupports}/> : <Updates updates={updatePosts}/>}
        </Container>
      </Section>
  );
}
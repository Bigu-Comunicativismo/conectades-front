import { useEffect, useRef, useState } from "react";
import { UserProvider } from "@/contexts/userContext";
import { Container } from "../structuralComponents/Container";
import { Image } from "../structuralComponents/Image";
import { Paragraph } from "../structuralComponents/Paragraph";
import { Section } from "../structuralComponents/Section";
import { Title } from "../structuralComponents/Title";
import { Input } from "../base/input/input";
import { SearchSm } from "@untitledui/icons";
import { AboutConectades } from "./AboutConectades";
import { CampaignSection } from "./CausesSections/CampaignSection";
import { DonationSection } from "./CausesSections/DonationSection";
import { FilterButtonGroup } from "./FilterButton";
import { JoinUs } from "./JoinUs";
import { RegisterButton } from "./RegisterButton";
import peoples from '@/assets/Assets Visuais/envato-graphic-68c24836-04d4-4367-ab44-3a32e067a11b.png';
import styles from './Home.module.css';
import inputStyles from '../base/input/input.module.css';

export function UnLoggedHome() {
  const [isOnFocus, setIsOnFocus] = useState(true);
  const activeSection = useRef<HTMLDivElement>(null);

  useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
          setIsOnFocus(entry.isIntersecting);
        }, {
          root: null,
          rootMargin: '0px',
          threshold: 0.2
        });
        
      observer.observe(activeSection.current!);
  
    }, [activeSection]);

      const handleSearch = (searchTerm: string) => {
        setSearchTerm(() => searchTerm);
    };
  const [searchTerm, setSearchTerm] = useState('');
    return (
      <Container classCss='' ref={activeSection}>
        <Section classCss={styles.sectionHomePrimary}>
          <Title.Level2 text="Conecte-se e transforme vidas" />
          <Paragraph text="Busque causas ou doe serviços para quem realmente precisa!" size="lg" />
          <Image src={peoples} alternateText='Três pessoas diferentes se abraçando e sorrindo.' className={styles.image} />
          <Input icon={SearchSm} type="text" 
            placeholder="Pesquisar" 
            className={`${inputStyles.input} ${styles.inputMargin}`} 
            value={searchTerm}
            onChange={handleSearch}  />

          <FilterButtonGroup />
        </Section>
        <Section>

          <CampaignSection searchTerm={searchTerm}/>
          <DonationSection searchTerm={searchTerm}/>
          {/* <OpportunitySection /> */}
        </Section>
        <Section classCss={styles.joinUsSection}>
          <AboutConectades />
          <UserProvider>
            <JoinUs />
          </UserProvider>
        </Section>
        {isOnFocus && <Container classCss={`flex flex-row justify-center ${styles.registerButtonsContainer}`}>
            <RegisterButton.LogIn />
            <RegisterButton.SignUp />
          </Container>}
      </Container>
    )
}
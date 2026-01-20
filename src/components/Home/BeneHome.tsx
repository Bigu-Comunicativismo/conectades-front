import { Container } from "../structuralComponents/Container";
import { Image } from "../structuralComponents/Image";
import { Paragraph } from "../structuralComponents/Paragraph";
import { Section } from "../structuralComponents/Section";
import { Title } from "../structuralComponents/Title";
import { Input } from "../base/input/input";
import { SearchSm } from "@untitledui/icons";
import inputStyles from '../base/input/Input.module.css';
import { DonationSection } from "./CausesSections/DonationSection";
import { FilterButtonGroup } from "./FilterButton";
import peoples from '@/assets/Assets Visuais/envato-graphic-68c24836-04d4-4367-ab44-3a32e067a11b.png';
import donationIcon from '@/assets/Assets Visuais/envato-graphic-1be80dd4-214a-4576-ae14-65f1a7a9ddfb.png';
import styles from './Home.module.css';
import { useState } from "react";

const filters = [
{ label: 'Doações', iconUrl: donationIcon, href: '/donations' },
// { label: 'Oportunidades', iconUrl: oportunityIcon, href: '/opportunities' },
];

export function BeneHome() {
  const handleSearch = (searchTerm: string) => {
          setSearchTerm(() => searchTerm);
      };
    const [searchTerm, setSearchTerm] = useState('');
    return (
        <Container classCss=''>
        <Section classCss={styles.sectionHomePrimary}>
          <Title.Level1 text="Conecte-se e transforme vidas" classCss={styles.titlePrincipal} />
          <Paragraph text="Busque causas ou doe serviços para quem realmente precisa!" size="lg" />
          <Image src={peoples} alternateText='Três pessoas diferentes se abraçando e sorrindo.' className={styles.image} />
          <Input icon={SearchSm} type="text" 
            placeholder="Pesquisar" 
            className={`${inputStyles.input} ${styles.inputMargin}`} 
            value={searchTerm}
            onChange={handleSearch}  />

          <FilterButtonGroup filterLists={filters}/>
        </Section>
        <Section>
          <DonationSection causeTitle={"Veja essas doações"} causeCallMessage={"Achamos que essas doações podem combinar com você"} searchTerm={searchTerm} />
          {/* <OpportunitySection /> */}
        </Section>
      </Container>
    )
}
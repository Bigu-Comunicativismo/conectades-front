import { Container } from "../structuralComponents/Container";
import { Image } from "../structuralComponents/Image";
import { Paragraph } from "../structuralComponents/Paragraph";
import { Section } from "../structuralComponents/Section";
import { Title } from "../structuralComponents/Title";
import { DonationSection } from "./CausesSections/DonationSection";
import { FilterButtonGroup } from "./FilterButton";
import peoples from '@/assets/Assets Visuais/envato-graphic-68c24836-04d4-4367-ab44-3a32e067a11b.png';
import donationIcon from '@/assets/Assets Visuais/envato-graphic-1be80dd4-214a-4576-ae14-65f1a7a9ddfb.png';
import styles from './Home.module.css';

const filters = [
{ label: 'Doações', iconUrl: donationIcon, href: '/donations' },
// { label: 'Oportunidades', iconUrl: oportunityIcon, href: '/opportunities' },
];

export function BeneHome() {
    return (
        <Container classCss=''>
        <Section classCss={styles.sectionHomePrimary}>
          <Title.Level2 text="Conecte-se e transforme vidas" />
          <Paragraph text="Busque causas ou doe serviços para quem realmente precisa!" size="lg" />
          <Image src={peoples} alternateText='Três pessoas diferentes se abraçando e sorrindo.' className={styles.image} />
          <input placeholder='Buscar' style={{ display: 'block', width: '100%', height: '44px', backgroundColor: 'white', borderRadius: '12px', padding: '12px', marginTop: '-44px', position: 'relative', zIndex: '5'}} />

          <FilterButtonGroup filterLists={filters}/>
        </Section>
        <Section>
          <DonationSection causeTitle={"Veja essas doações"} causeCallMessage={"Achamos que essas doações podem combinar com você"} />
          {/* <OpportunitySection /> */}
        </Section>
      </Container>
    )
}
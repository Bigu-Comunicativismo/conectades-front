import { Container } from "../structuralComponents/Container";
import { Image } from "../structuralComponents/Image";
import { Paragraph } from "../structuralComponents/Paragraph";
import { Section } from "../structuralComponents/Section";
import { Title } from "../structuralComponents/Title";
import { CampaignSection } from "./CausesSections/CampaignSection";
import { FilterButtonGroup } from "./FilterButton";
import peoples from '@/assets/Assets Visuais/envato-graphic-68c24836-04d4-4367-ab44-3a32e067a11b.png';
import campaingnIcon from '@/assets/Assets Visuais/envato-graphic-e417e6db-4b26-48ec-9acd-9fb83cebe3a6.png';
import styles from './Home.module.css';

const filters = [
{ label: 'Campanhas', iconUrl: campaingnIcon, href: '/campaigns' },
];

export function DonaHome() {
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
          <CampaignSection causeTitle={"Campanhas pra você"} causeCallMessage={"Essas campanhas dão um match com seus interesses"}/>
        </Section>
      </Container>
    )
}
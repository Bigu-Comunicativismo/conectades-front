import { Container } from "../structuralComponents/Container";
import { Image } from "../structuralComponents/Image";
import { Paragraph } from "../structuralComponents/Paragraph";
import { Section } from "../structuralComponents/Section";
import { Title } from "../structuralComponents/Title";
import { AboutConectades } from "./AboutConectades";
import { CampaignSection } from "./CausesSections/CampaignSection";
import { DonationSection } from "./CausesSections/DonationSection";
import { FilterButtonGroup } from "./FilterButton";
import { JoinUs } from "./JoinUs";
import { RegisterButton } from "./RegisterButton";
import peoples from '@/assets/Assets Visuais/envato-graphic-68c24836-04d4-4367-ab44-3a32e067a11b.png';
import styles from './Home.module.css';

export function UnLoggedHome() {
    return (
        <Container classCss=''>
        <Section classCss={styles.sectionHomePrimary}>
          <Title.Level2 text="Conecte-se e transforme vidas" />
          <Paragraph text="Busque causas ou doe serviços para quem realmente precisa!" size="lg" />
          <Image src={peoples} alternateText='Três pessoas diferentes se abraçando e sorrindo.' className={styles.image} />
          <input placeholder='Buscar' style={{ display: 'block', width: '100%', height: '44px', backgroundColor: 'white', borderRadius: '12px', padding: '12px', marginTop: '-44px', position: 'relative', zIndex: '5'}} />

          <FilterButtonGroup />
        </Section>
        <Section>
          <Container classCss={`flex flex-row justify-center gap-8 ${styles.registerButtonsContainer}`}>
            <RegisterButton.LogIn />
            <RegisterButton.SignUp />
          </Container>
          <CampaignSection />
          <DonationSection />
          {/* <OpportunitySection /> */}
        </Section>
        <Section classCss={styles.joinUsSection}>
          <AboutConectades />
          <JoinUs />
        </Section>
      </Container>
    )
}
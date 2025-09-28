import { Section } from '@/components/structuralComponents/Section';
import { Main } from '@/components/Main';
import { Title } from '@/components/structuralComponents/Title';
import { Paragraph } from '@/components/structuralComponents/Paragraph';
import { Image } from '@/components/structuralComponents/Image';
import { FilterButtonGroup } from '@/components/Home/FilterButton';
import { Container } from '@/components/structuralComponents/Container';
import { RegisterButton } from '@/components/Home/RegisterButton';
import { CampaignSection } from '@/components/Home/CausesSections/CampaignSection';
import { DonationSection } from '@/components/Home/CausesSections/DonationSection';
import { OpportunitySection } from '@/components/Home/CausesSections/OpportunitySection';
import { AboutConectades } from '@/components/Home/AboutConectades';
import { JoinUs } from '@/components/Home/JoinUs';
import peoples from '@/assets/Assets Visuais/envato-graphic-68c24836-04d4-4367-ab44-3a32e067a11b.png';
import styles from './Home.module.css';


export function Home() {
  return (
      <Main>
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
          <OpportunitySection />
        </Section>
        <Section classCss={styles.joinUsSection}>
        <AboutConectades />
        <JoinUs />
        </Section>
      </Main>
  )
}
import { Container } from "@/components/structuralComponents/Container";
import { CausesContainer } from "../CausesContainer";
import { Title } from "@/components/structuralComponents/Title";
import { Paragraph } from "@/components/structuralComponents/Paragraph";
import { SeeAllLink } from "../SeeAllLink";
import styles from '../CausesContainer.module.css';

interface CausesSectionsContainerProps {
    causeContainerAriaName: string;
    causeTitle: string;
    causeCallMessage: string;
    causeUrl: string;
    children: React.ReactNode;
}

export function CausesSectionsContainer({ causeContainerAriaName, causeTitle, causeCallMessage, causeUrl, children }: CausesSectionsContainerProps) {
    return (
        <Container classCss='' ariaLabel={causeContainerAriaName}>
            <CausesContainer>
                <Container classCss={styles.causesTitleContainer}>
                    <Title.Level3 text={causeTitle} />
                    <Paragraph text={causeCallMessage} size="sm" weight='regular' variant='secondary' />
                </Container>
                <SeeAllLink href={causeUrl} />
            </CausesContainer>
            {children}
        </Container>
    )
}
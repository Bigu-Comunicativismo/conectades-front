import { Section } from "@/components/structuralComponents/Section";
import { Donations } from "@/components/Donations";
import { createLazyFileRoute } from "@tanstack/react-router";


export const Route = createLazyFileRoute('/donations/')({
    component: DonationsPage,
});

export function DonationsPage () {
    return (
        <Section>
                <Donations />
        </Section>
    )
}

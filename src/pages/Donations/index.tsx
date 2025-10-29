import { Section } from "@/components/structuralComponents/Section";
import { Donations } from "@/components/Donations";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/donations/')({
    component: DonationsPage,
});

export function DonationsPage () {
    return (
        <Section>
            <Donations />
        </Section>
    )
}

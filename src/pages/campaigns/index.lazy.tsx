import { Campaigns } from "@/components/Campaigns";
import { Section } from "@/components/structuralComponents/Section";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute('/campaigns/')({
    component: CampaignsPage,
});

export function CampaignsPage () {
    return (
        <Section>
                <Campaigns />
        </Section>
    )
}
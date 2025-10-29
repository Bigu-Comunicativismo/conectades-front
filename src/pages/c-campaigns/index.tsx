import { Campaigns } from "@/components/Campaigns";
import { Section } from "@/components/structuralComponents/Section";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/campaigns/')({
    component: CampaignsPage,
});

export function CampaignsPage () {
    return (
        <Section>
            <Campaigns />
        </Section>
    )
}
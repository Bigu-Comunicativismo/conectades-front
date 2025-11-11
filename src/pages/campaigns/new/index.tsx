import { NewCampaign } from '@/components/Campaign/New'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/campaigns/new/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <NewCampaign />;
}

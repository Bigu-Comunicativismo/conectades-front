import { EditCampaign } from '@/components/Campaign/Edit';
import { apiFetch } from '@/utils/fetchApi';
import { createFileRoute, useLoaderData } from '@tanstack/react-router';

export const Route = createFileRoute('/campaigns/edit/$id')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const campaignId = Number(params.id)
    const campaign = await apiFetch({apiPath:`http://srv1037558.hstgr.cloud:8001/api/campanhas/${campaignId}`})

    return {campaign}
  }
  
})

function RouteComponent() {
  const { campaign } = useLoaderData({from: "/campaigns/edit/$id"})
  return <EditCampaign campaign={campaign} />
}

import { EditDonation } from '@/components/Donation/Edit'
import { apiFetch } from '@/utils/fetchApi'
import { createFileRoute, useLoaderData } from '@tanstack/react-router'

export const Route = createFileRoute('/donations/edit/$id')({
  component: RouteComponent,
    loader: async ({ params }) => {
      const donationId = Number(params.id)
      const donation = await apiFetch({apiPath:`http://srv1037558.hstgr.cloud:8001/api/doacoes/independentes/${donationId}`})
  
      return {donation}
    }
})

function RouteComponent() {
    const { donation } = useLoaderData({from: "/donations/edit/$id"})
  return <EditDonation campaign={donation} />
}

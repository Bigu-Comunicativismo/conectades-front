import { EditDonation } from '@/components/Donation/Edit'
import { apiFetch } from '@/utils/fetchApi'
import { createFileRoute, useLoaderData } from '@tanstack/react-router'

export const Route = createFileRoute('/donations/edit/$id')({
  component: RouteComponent,
    loader: async ({ params }) => {
      const donationId = Number(params.id)
      const donation = await apiFetch({apiPath:`https://conectades.com.br/api/doacoes/independentes/${donationId}`})
  
      return {donation}
    }
})

function RouteComponent() {
    const { donation } = useLoaderData({from: "/donations/edit/$id"})
  return <EditDonation campaign={donation} />
}

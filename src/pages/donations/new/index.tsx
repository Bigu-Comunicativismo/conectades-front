import { NewDonation } from '@/components/Donation/New'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/donations/new/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <NewDonation />
}

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/mycampaigns/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/mycampaigns/"!</div>
}

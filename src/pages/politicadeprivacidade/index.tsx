import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/politicadeprivacidade/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/politicadeprivacidade/"!</div>
}

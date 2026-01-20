import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/politicadeprivacidade/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/politicadeprivacidade/"!</div>
}

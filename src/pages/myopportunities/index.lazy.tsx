import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/myopportunities/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/myopportunities/"!</div>
}

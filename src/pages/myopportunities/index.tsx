import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/myopportunities/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/myopportunities/"!</div>
}

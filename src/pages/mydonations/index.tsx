import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/mydonations/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/mydonations/"!</div>
}

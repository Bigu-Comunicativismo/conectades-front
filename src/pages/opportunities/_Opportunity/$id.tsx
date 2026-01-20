import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/opportunities/_Opportunity/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/opportunities/_Opportunity/$id"!</div>
}

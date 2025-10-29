import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/termosdeuso/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/termosdeuso/"!</div>
}

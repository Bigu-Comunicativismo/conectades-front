import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/termosdeuso/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/termosdeuso/"!</div>
}

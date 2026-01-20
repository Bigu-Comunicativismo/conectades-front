import { AboutUs } from '@/components/AboutUs'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/aboutus/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AboutUs />
}


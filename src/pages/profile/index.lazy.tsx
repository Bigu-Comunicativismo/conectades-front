import { Profile } from '@/components/Profile'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/profile/')({
  component: RouteComponent,
})

function RouteComponent() {
  const user = JSON.parse(localStorage.getItem("user")!);
  return <Profile userInfo={user} />
}

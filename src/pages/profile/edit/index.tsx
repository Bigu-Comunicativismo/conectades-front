import { EditProfile } from '@/components/Profile/Edit';
import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import { type User } from '@/components/Profile/Edit';
export const Route = createFileRoute('/profile/edit/')({
  component: RouteComponent,
  loader: async () => {
    const user: User = JSON.parse(localStorage.getItem("user")!);
    return { user };
  }
})

function RouteComponent() {
  const {user} = useLoaderData({from: "/profile/edit/"})
  return <EditProfile userInfo={user} />
}

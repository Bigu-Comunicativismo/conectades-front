import { createFileRoute } from '@tanstack/react-router';
import { useLoggedUserContext } from '@/contexts/loggedUserContext';
import { setOptions } from '@/utils/setOptions';
import { UnLoggedHome } from '@/components/Home/UnLoggedHome';
import {BeneHome} from '@/components/Home/BeneHome';
import { DonaHome } from '@/components/Home/DonaHome';

export const Route = createFileRoute('/_Home/')({
  component: Home,
  loader: async () => {
    const categories = localStorage.getItem('categories');
    const locations = localStorage.getItem('locations');

    if (categories && locations) return;
    setOptions();
  }
});

export function Home() {
  const { loggedUser } = useLoggedUserContext();

  if (loggedUser?.user?.tipo_usuario === 6) return <DonaHome />;
  if (loggedUser?.user?.tipo_usuario === 5) return <BeneHome />;
  return (
    <UnLoggedHome />
  )
}
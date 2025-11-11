import * as React from 'react';
import { Navigate, Outlet, createRootRoute } from '@tanstack/react-router';
import { TabProvider } from '@/contexts/campaign';
import { Main } from '@/components/Main';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ScrollManager } from '@/components/ScrollManager';
import '../App.css';
import '@/styles/global.css';
import { useLoggedUserContext } from '@/contexts/loggedUserContext';
import { retrieveLoggedUser } from '@/utils/retrieveLoggedUser';
import { CreateItem } from '@/components/CreateItem';

export const Route = createRootRoute({
  component: RootComponent,
  onError: () => {
    Navigate({ to: '/error' })
  }
})

function RootComponent() {
  const {loggedUser, setLoggedUser} = useLoggedUserContext();
  const [userType, setUserType] = React.useState<number | undefined>(undefined);
  const [isOnFocus, setIsOnFocus] = React.useState(true);
  const activeSection = React.useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
    
    if(!loggedUser) retrieveLoggedUser(setLoggedUser);
    
    if(loggedUser?.user) setUserType(loggedUser.user.tipo_usuario);
  },[loggedUser])

    React.useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
          setIsOnFocus(entry.isIntersecting);
        }, {
          root: null,
          rootMargin: '0px',
          threshold: 0.1
        });
        
      observer.observe(activeSection.current!);
  
    }, [activeSection]);

  return (
    <React.Fragment>
        <Header />
        <TabProvider>
        <Main>
          <ScrollManager />
          <Outlet />
        </Main>
        </TabProvider>
        <Footer ref={activeSection}/>
        {!isOnFocus && (userType !== undefined && <CreateItem btnText={userType === 5 ? "Ciar campanha" : "Criar doação"} path={userType === 5 ? "/campaigns/new" : "/donations/new"}/>)}
    </React.Fragment>
  )
}

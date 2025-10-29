import * as React from 'react';
import { Navigate, Outlet, createRootRoute } from '@tanstack/react-router';
import { TabProvider } from '@/contexts/campaign';
import { Main } from '@/components/Main';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import '../App.css';
import '@/styles/global.css';

export const Route = createRootRoute({
  component: RootComponent,
  onError: () => {
    Navigate({ to: '/error' })
  }
})

function RootComponent() {
  return (
    <React.Fragment>
        <Header />
        <TabProvider>
        <Main>
            <Outlet />
        </Main>
        </TabProvider>
        <Footer />
    </React.Fragment>
  )
}

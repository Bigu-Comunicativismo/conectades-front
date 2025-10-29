import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Main } from '@/components/Main'
import { Header } from '@/components/marketing/header-navigation/header'
import { Footer } from '@/components/Footer'
import '../App.css';
import '@/styles/global.css';

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
        <Header />
        <Main>
            <Outlet />
        </Main>
        <Footer />
    </React.Fragment>
  )
}

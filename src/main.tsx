import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createRouter, RouterProvider} from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { LoggedUserProvider } from './contexts/loggedUserContext'

const router = createRouter({
  routeTree
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoggedUserProvider>
      <RouterProvider router={router} />
    </LoggedUserProvider>
  </StrictMode>,
)

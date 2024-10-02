import { StrictMode } from 'react'
import { RecoilRoot } from 'recoil';
import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthProvider } from './providers/auth-provider.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import router from './router/index.tsx'
import { Toaster } from 'sonner'

const queryClient = new QueryClient();


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Toaster />
          <RouterProvider router={router} />
        </QueryClientProvider>
      </RecoilRoot>
    </AuthProvider>
  </StrictMode>,
)

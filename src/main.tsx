import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import '@/index.css'
import '@fontsource/unifrakturmaguntia/400.css'
import { App } from '@/App.tsx'
import { WebSocketProvider } from '@/features/notifications/components/WebSocketProvider'
import { installErrorReporting } from '@/shared/lib/error-reporting'

installErrorReporting()

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      gcTime: 5 * 60_000,
    },
  },
})

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Élément #root introuvable')
}

createRoot(rootElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <WebSocketProvider>
          <App />
        </WebSocketProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)

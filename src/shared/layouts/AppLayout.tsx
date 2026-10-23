import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { SiteHeader } from '@/features/site/components/SiteHeader'
import { AppErrorBoundary } from '@/shared/components/AppErrorBoundary'
import { PageLoader } from '@/shared/components/PageLoader'
import { ScrollToTopButton } from '@/shared/components/ScrollToTopButton'

export function AppLayout() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-creme text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <SiteHeader />

      <AppErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <div key={location.pathname} className="animate-fade-in">
            <Outlet />
          </div>
        </Suspense>
      </AppErrorBoundary>

      <ScrollToTopButton />
    </div>
  )
}

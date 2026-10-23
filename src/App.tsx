import { createElement, lazy, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthGuard } from '@/features/auth/components/AuthGuard'
import { ReservationPage } from '@/features/reservations/pages/ReservationPage'
import { NewReservationPage } from '@/features/reservations/pages/NewReservationPage'
import { MyReservationsPage } from '@/features/reservations/pages/MyReservationsPage'
import { MemberSpaceIndex } from '@/features/member-space/pages/MemberSpaceIndex'
import { RoleGuard } from '@/features/auth/components/RoleGuard'
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { RegisterPage } from '@/features/auth/pages/RegisterPage'
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage'
import { AppLayout, useTheme } from '@/shared'

const adminPage = lazy(() =>
  import('@/features/admin/pages/AdminPage').then((loaded) => ({ default: loaded.AdminPage })),
)
const adminOverviewPage = lazy(() =>
  import('@/features/admin/pages/AdminOverviewPage').then((loaded) => ({
    default: loaded.AdminOverviewPage,
  })),
)
const adminTablesPage = lazy(() =>
  import('@/features/admin/pages/AdminTablesPage').then((loaded) => ({
    default: loaded.AdminTablesPage,
  })),
)
const adminJournalPage = lazy(() =>
  import('@/features/admin/pages/AdminJournalPage').then((loaded) => ({
    default: loaded.AdminJournalPage,
  })),
)
const adminReviewsPage = lazy(() =>
  import('@/features/admin/pages/AdminReviewsPage').then((loaded) => ({
    default: loaded.AdminReviewsPage,
  })),
)
const adminBlogPage = lazy(() =>
  import('@/features/admin/pages/AdminBlogPage').then((loaded) => ({
    default: loaded.AdminBlogPage,
  })),
)
const adminMenuPage = lazy(() =>
  import('@/features/admin/pages/AdminMenuPage').then((loaded) => ({
    default: loaded.AdminMenuPage,
  })),
)
const carteHomePage = lazy(() =>
  import('@/features/menu/pages/CarteHomePage').then((loaded) => ({ default: loaded.CarteHomePage })),
)
const categoryPage = lazy(() =>
  import('@/features/menu/pages/CategoryPage').then((loaded) => ({ default: loaded.CategoryPage })),
)
const cartePage = lazy(() =>
  import('@/features/menu/pages/CartePage').then((loaded) => ({ default: loaded.CartePage })),
)
const dishDetailPage = lazy(() =>
  import('@/features/menu/pages/DishDetailPage').then((loaded) => ({
    default: loaded.DishDetailPage,
  })),
)
const aboutPage = lazy(() =>
  import('@/features/site/pages/AboutPage').then((loaded) => ({ default: loaded.AboutPage })),
)
const blogPage = lazy(() =>
  import('@/features/blog/pages/BlogPage').then((loaded) => ({ default: loaded.BlogPage })),
)
const articlePage = lazy(() =>
  import('@/features/blog/pages/ArticlePage').then((loaded) => ({ default: loaded.ArticlePage })),
)
const contactPage = lazy(() =>
  import('@/features/site/pages/ContactPage').then((loaded) => ({ default: loaded.ContactPage })),
)
const notFoundPage = lazy(() =>
  import('@/features/site/pages/NotFoundPage').then((loaded) => ({ default: loaded.NotFoundPage })),
)
const memberSpacePage = lazy(() =>
  import('@/features/member-space/pages/MemberSpacePage').then((loaded) => ({
    default: loaded.MemberSpacePage,
  })),
)
const myReviewsPage = lazy(() =>
  import('@/features/reviews/pages/MyReviewsPage').then((loaded) => ({
    default: loaded.MyReviewsPage,
  })),
)
const settingsPage = lazy(() =>
  import('@/features/settings/pages/SettingsPage').then((loaded) => ({
    default: loaded.SettingsPage,
  })),
)
const reviewsPage = lazy(() =>
  import('@/features/reviews/pages/ReviewsPage').then((loaded) => ({ default: loaded.ReviewsPage })),
)

export function App() {
  const { theme } = useTheme()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/" element={<DashboardPage />} />
        <Route path="/dashboard" element={<Navigate to="/" replace />} />

        <Route element={<AuthGuard />}>
          <Route path="/mon-espace" element={createElement(memberSpacePage)}>
            <Route index element={<MemberSpaceIndex />} />
            <Route path="avis" element={createElement(myReviewsPage)} />
            <Route path="parametres" element={createElement(settingsPage)} />
          </Route>

          <Route element={<RoleGuard allowedRoles={['ADMIN']} />}>
            <Route path="/admin" element={createElement(adminPage)}>
              <Route index element={createElement(adminOverviewPage)} />
              <Route path="tables" element={createElement(adminTablesPage)} />
              <Route path="journal" element={createElement(adminJournalPage)} />
              <Route path="avis" element={createElement(adminReviewsPage)} />
              <Route path="carte" element={createElement(adminMenuPage)} />
              <Route path="blog" element={createElement(adminBlogPage)} />
            </Route>
          </Route>
        </Route>

        <Route path="/reserver" element={<ReservationPage />}>
          <Route index element={<NewReservationPage />} />
          <Route path="mes-reservations" element={<MyReservationsPage />} />
        </Route>

        <Route path="/carte" element={createElement(cartePage)}>
          <Route index element={createElement(carteHomePage)} />
          <Route path=":category" element={createElement(categoryPage)} />
          <Route path=":category/:dishId" element={createElement(dishDetailPage)} />
        </Route>

        <Route path="/avis" element={createElement(reviewsPage)} />
        <Route path="/a-propos" element={createElement(aboutPage)} />
        <Route path="/contact" element={createElement(contactPage)} />
        <Route path="/blog" element={createElement(blogPage)} />
        <Route path="/blog/:articleId" element={createElement(articlePage)} />
        <Route path="*" element={createElement(notFoundPage)} />
      </Route>
    </Routes>
  )
}

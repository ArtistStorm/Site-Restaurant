import { Outlet } from 'react-router-dom'
import { CarteTabs } from '@/features/menu/components/CarteTabs'

export function CartePage() {
  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Carte</h1>
      <CarteTabs />
      <Outlet />
    </section>
  )
}

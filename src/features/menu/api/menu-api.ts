import { restaurantApi } from '@/shared/api/restaurant-api'
import type { MenuItem } from '@/features/menu/types/menu'

export async function getMenuItems(): Promise<MenuItem[]> {
  return restaurantApi.menu.list()
}

export async function getMenuItem(id: string): Promise<MenuItem | null> {
  const items = await restaurantApi.menu.list()
  return items.find((menuItem) => menuItem.id === id) ?? null
}

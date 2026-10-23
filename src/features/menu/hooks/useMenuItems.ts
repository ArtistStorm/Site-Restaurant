import { useQuery } from '@tanstack/react-query'
import { getMenuItems } from '@/features/menu/api/menu-api'

export function useMenuItems() {
  return useQuery({
    queryKey: ['menu-items'],
    queryFn: getMenuItems,
  })
}

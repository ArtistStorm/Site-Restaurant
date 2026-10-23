import { useQuery } from '@tanstack/react-query'
import { getMenuItem } from '@/features/menu/api/menu-api'

export function useMenuItem(id: string | undefined) {
  return useQuery({
    queryKey: ['menu-item', id],
    queryFn: () => getMenuItem(id ?? ''),
    enabled: id !== undefined,
    retry: false,
  })
}

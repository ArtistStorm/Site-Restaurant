import { useMutation } from '@tanstack/react-query'
import { restaurantApi, type ChangePasswordValues } from '@/shared/api/restaurant-api'
import { useAuthStore } from '@/features/auth/auth-store'
import { notifySuccess } from '@/features/notifications/notify-success'

export function useChangePassword() {
  const memberId = useAuthStore((state) => state.memberId) ?? ''

  return useMutation({
    mutationFn: (values: ChangePasswordValues) => restaurantApi.members.changePassword(memberId, values),
    onSuccess: () => {
      notifySuccess('Votre mot de passe a bien été modifié.')
    },
  })
}

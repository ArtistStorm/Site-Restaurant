import { zodResolver } from '@hookform/resolvers/zod'
import { KeyRound, LoaderCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { cn } from '@/shared'
import { getSettingsErrorMessage } from '@/features/settings/hooks/useUpdateProfile'
import { useChangePassword } from '@/features/settings/hooks/useChangePassword'
import { passwordSchema, type PasswordFormValues } from '@/features/settings/types/password-schema'

const inputClassName =
  'rounded-none border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-800'

export function PasswordForm() {
  const changePassword = useChangePassword()

  const {
    register: field,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
  })

  const onSubmit = (values: PasswordFormValues) => {
    changePassword.mutate(
      { currentPassword: values.currentPassword, newPassword: values.newPassword },
      { onSuccess: () => reset() },
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-sm flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="current-password" className="text-sm font-medium">
          Mot de passe actuel
        </label>
        <input
          id="current-password"
          type="password"
          autoComplete="current-password"
          className={inputClassName}
          {...field('currentPassword')}
        />
        {errors.currentPassword && (
          <p className="text-sm text-red-600">{errors.currentPassword.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="new-password" className="text-sm font-medium">
          Nouveau mot de passe
        </label>
        <input
          id="new-password"
          type="password"
          autoComplete="new-password"
          className={inputClassName}
          {...field('newPassword')}
        />
        {errors.newPassword && <p className="text-sm text-red-600">{errors.newPassword.message}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="confirm-new-password" className="text-sm font-medium">
          Confirmer le nouveau mot de passe
        </label>
        <input
          id="confirm-new-password"
          type="password"
          autoComplete="new-password"
          className={inputClassName}
          {...field('confirmPassword')}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
        )}
      </div>

      {changePassword.isError && (
        <p className="text-sm text-red-600">{getSettingsErrorMessage(changePassword.error)}</p>
      )}

      <button
        type="submit"
        disabled={changePassword.isPending}
        className={cn(
          'flex w-fit items-center gap-2 rounded-none bg-bordeaux px-4 py-2 font-medium text-white transition-colors hover:bg-vigne disabled:opacity-50 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200',
        )}
      >
        {changePassword.isPending ? (
          <LoaderCircle className="animate-spin" size={18} aria-hidden="true" />
        ) : (
          <KeyRound size={18} aria-hidden="true" />
        )}
        Modifier le mot de passe
      </button>
    </form>
  )
}

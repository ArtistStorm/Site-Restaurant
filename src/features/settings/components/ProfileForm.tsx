import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle, Save } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { cn } from '@/shared'
import { getSettingsErrorMessage, useUpdateProfile } from '@/features/settings/hooks/useUpdateProfile'
import { profileSchema, type ProfileFormValues } from '@/features/settings/types/profile-schema'

type ProfileFormProps = {
  defaultName: string
}

export function ProfileForm({ defaultName }: ProfileFormProps) {
  const updateProfile = useUpdateProfile()

  const {
    register: field,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: defaultName },
  })

  const onSubmit = (values: ProfileFormValues) => {
    updateProfile.mutate(values.name)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-sm flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="profile-name" className="text-sm font-medium">
          Nom affiché
        </label>
        <input
          id="profile-name"
          type="text"
          autoComplete="name"
          className="rounded-none border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
          {...field('name')}
        />
        {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
      </div>

      {updateProfile.isError && (
        <p className="text-sm text-red-600">{getSettingsErrorMessage(updateProfile.error)}</p>
      )}

      <button
        type="submit"
        disabled={!isDirty || updateProfile.isPending}
        className={cn(
          'flex w-fit items-center gap-2 rounded-none bg-bordeaux px-4 py-2 font-medium text-white transition-colors hover:bg-vigne disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200',
        )}
      >
        {updateProfile.isPending ? (
          <LoaderCircle className="animate-spin" size={18} aria-hidden="true" />
        ) : (
          <Save size={18} aria-hidden="true" />
        )}
        Enregistrer le nom
      </button>
    </form>
  )
}

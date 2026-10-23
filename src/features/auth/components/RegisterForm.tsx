import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle, UserPlus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { cn } from '@/shared'
import { getRegisterErrorMessage, useRegister } from '@/features/auth/hooks/useRegister'
import { registerSchema, type RegisterFormValues } from '@/features/auth/types/register-schema'

export function RegisterForm() {
  const register = useRegister()

  const {
    register: field,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  })

  const onSubmit = (values: RegisterFormValues) => {
    register.mutate({ name: values.name, email: values.email, password: values.password })
  }

  if (register.isSuccess) {
    return (
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-none bg-white p-6 shadow dark:bg-slate-900">
        <p className="font-medium">Compte créé.</p>
        <p className="text-sm">Vous pouvez maintenant vous connecter avec votre email et votre mot de passe.</p>
        <Link
          to="/login"
          className="flex items-center justify-center gap-2 rounded-none bg-bordeaux px-4 py-2 font-medium text-white hover:bg-vigne dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
        >
          Aller à la connexion
        </Link>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-sm flex-col gap-4 rounded-none bg-white p-6 shadow dark:bg-slate-900"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm font-medium">
          Nom
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          className="rounded-none border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
          {...field('name')}
        />
        {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className="rounded-none border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
          {...field('email')}
        />
        {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="text-sm font-medium">
          Mot de passe
        </label>
        <input
          id="password"
          type="password"
          autoComplete="new-password"
          className="rounded-none border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
          {...field('password')}
        />
        {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="confirmPassword" className="text-sm font-medium">
          Confirmer le mot de passe
        </label>
        <input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          className="rounded-none border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
          {...field('confirmPassword')}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
        )}
      </div>

      {register.isError && (
        <p className="text-sm text-red-600">{getRegisterErrorMessage(register.error)}</p>
      )}

      <button
        type="submit"
        disabled={register.isPending}
        className={cn(
          'flex items-center justify-center gap-2 rounded-none bg-bordeaux px-4 py-2 font-medium text-white hover:bg-vigne dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200',
          register.isPending && 'opacity-50',
        )}
      >
        {register.isPending ? (
          <LoaderCircle className="animate-spin" size={18} />
        ) : (
          <UserPlus size={18} />
        )}
        Créer mon compte
      </button>
    </form>
  )
}

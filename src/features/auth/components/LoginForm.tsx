import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle, LogIn } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { cn } from '@/shared'
import { getLoginErrorMessage, useLogin } from '@/features/auth/hooks/useLogin'
import { loginSchema, type LoginFormValues } from '@/features/auth/types/login-schema'

export function LoginForm() {
  const login = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = (values: LoginFormValues) => {
    login.mutate(values)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-sm flex-col gap-4 rounded-none bg-white p-6 shadow dark:bg-slate-900"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className="rounded-none border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
          {...register('email')}
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
          autoComplete="current-password"
          className="rounded-none border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
          {...register('password')}
        />
        {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
      </div>

      {login.isError && (
        <p className="text-sm text-red-600">{getLoginErrorMessage(login.error)}</p>
      )}

      <button
        type="submit"
        disabled={login.isPending}
        className={cn(
          'flex items-center justify-center gap-2 rounded-none bg-bordeaux px-4 py-2 font-medium text-white hover:bg-vigne dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200',
          login.isPending && 'opacity-50',
        )}
      >
        {login.isPending ? (
          <LoaderCircle className="animate-spin" size={18} />
        ) : (
          <LogIn size={18} />
        )}
        Se connecter
      </button>
    </form>
  )
}

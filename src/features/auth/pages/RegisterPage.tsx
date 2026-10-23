import { Link } from 'react-router-dom'
import { RegisterForm } from '@/features/auth/components/RegisterForm'

export function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-4">
      <h1 className="text-3xl font-bold">Inscription</h1>
      <RegisterForm />
      <Link to="/login" className="text-sm underline">
        Déjà inscrit ? Se connecter
      </Link>
    </div>
  )
}

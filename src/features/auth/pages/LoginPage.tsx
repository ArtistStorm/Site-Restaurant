import { Link } from 'react-router-dom'
import { LoginForm } from '@/features/auth/components/LoginForm'

export function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-4">
      <h1 className="text-3xl font-bold">Connexion</h1>
      <LoginForm />
      <Link to="/register" className="text-sm underline">
        Pas encore de compte ? Créer un compte
      </Link>
    </div>
  )
}

import { LoginForm } from '@/components/auth/LoginForm'
import Link from 'next/link'

export default function SuperAdminLogin() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col items-center space-y-2 text-center">
        <img
          src="/solution22-logo.png"
          alt="Logo"
          className="h-20 w-auto"
        />
      </div>
      <LoginForm />
    </div>
  )
}

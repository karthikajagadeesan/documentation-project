import { Suspense } from 'react'
import { RoleGateway } from '@/helper/role-gateway'
import { LoadingState } from '@/components/ui/loading-state'
import UserLogin from './user'
import SuperAdminLogin from './superadmin'

export default async function LoginPage() {
  return (
    <div className="container relative flex h-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-1 lg:px-0">
      <Suspense fallback={<LoadingState />}>
        <RoleGateway 
          user={<UserLogin />}
          superadmin={<SuperAdminLogin />}
        />
      </Suspense>
    </div>
  )
}

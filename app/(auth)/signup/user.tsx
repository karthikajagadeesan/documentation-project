import Link from 'next/link'

export default function UserSignup() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col items-center space-y-2 text-center">
        <img
          src="/solution22-logo.png"
          alt="Logo"
          className="h-20 w-auto"
        />
        <p className="text-sm text-muted-foreground">
          Self-registration is currently disabled. 
        </p>
      </div>
      <div className="rounded-lg border border-warning bg-warning/10 p-4 text-center text-sm">
        User accounts are managed by the administrator. Please contact your administrator
        to gain access.
      </div>
    </div>
  )
}

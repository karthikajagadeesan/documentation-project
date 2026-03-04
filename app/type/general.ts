// ─────────────────────────────────────────────────────────────────────────────
// General application-level types shared across components and actions.
// ─────────────────────────────────────────────────────────────────────────────

/** User role enum matching the profiles table. */
export type UserRole = 'superadmin' | 'user'

/** A single anchor entry used by the OnThisPage sidebar component. */
export interface Anchor {
  id: string
  title: string
}

/** Standard return shape for server auth actions. */
export interface AuthActionResult {
  error?: string
  success?: boolean
}

/** Form values for the login form. */
export interface LoginFormValues {
  email: string
  password: string
}

/** Form values for the signup form. */
export interface SignupFormValues {
  name: string
  email: string
  password: string
}

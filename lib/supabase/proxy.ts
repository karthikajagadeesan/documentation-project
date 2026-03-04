import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/**
 * Call at the top of any protected Server Component or page.
 * Redirects to /login if the user is not authenticated.
 */
export async function requireAuth(): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
}

/**
 * Call at the top of auth pages (/login, /signup).
 * Redirects to / if the user is already authenticated.
 */
export async function redirectIfAuthenticated(): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) redirect("/");
}

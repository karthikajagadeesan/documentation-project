import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import DomainFinder from '@/helper/domain-finder'
import { Database } from '@/types/database-type'
import { redirect } from 'next/navigation'
import { createClient } from './server'

const AUTH_PATHS = ['/login', '/signup']

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    const supabase = createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
                },
            },
        }
    )

    const pathname = request.nextUrl.pathname;
    const hostname = request.headers.get("host") || request.nextUrl.hostname;
    const subdomain = DomainFinder(hostname)
    const isAuthPath = AUTH_PATHS.some((path) => pathname.startsWith(path))

    if (subdomain === "superadmin" || subdomain === "user") {
        const { data } = await supabase.auth.getUser();
        const user = data?.user;

        if (isAuthPath && user) {
            return NextResponse.redirect(new URL('/', request.url))
        }
        
        if (pathname === '/' && subdomain !== "user") {
            return NextResponse.redirect(
                new URL(user ? '/' : '/login', request.url)
            )
        }
        
        if (pathname === '/' && subdomain === "user") {
            return supabaseResponse;
        }
        
        if (!user && !isAuthPath) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    return supabaseResponse;
}
export async function requireAuth(): Promise<void> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/login");
}

export async function redirectIfAuthenticated(): Promise<void> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) redirect("/");
}

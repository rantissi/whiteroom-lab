import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request: { headers: request.headers } })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set({ name, value, ...options }))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set({ name, value, ...options }))
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  // 1. Proteksi Rute Aplikasi Internal User
  const protectedRoutes = ['/dashboard', '/workspace', '/paths', '/projects', '/discuss']
  if (protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route)) && !session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // 2. Proteksi Rute Super Khusus Admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!session) return NextResponse.redirect(new URL('/login', request.url))
    
    // Ambil data profil untuk verifikasi flag is_admin
    const { data: profile } = await supabase.from('profiles').select('is_admin').eq('id', session.user.id).single()
    if (!profile || !profile.is_admin) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
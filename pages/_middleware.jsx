import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  // Token will exist if user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET })

  const { pathname } = req.nextUrl

  // Allow the request if the following is true...
  // 1) It's a request for next-auth session and provider fetching
  // 2) The token is exists
  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next()
  }

  // if they don't have the token AND are requesting
  // a protected route redirect them to login
  if (!token && pathname !== '/login') {
    return NextResponse.redirect('https://hanabi-gold.vercel.app/login')
  }
}

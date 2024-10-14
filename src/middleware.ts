import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const expiresIn6hrs = new Date(new Date().getTime() + 6 * 60 * 60 * 1000);
  const isAuth = request.cookies.get('access_token')?.value;
  const refresh_token = request.cookies.get('refresh_token')?.value;
  const pathname = request.nextUrl.pathname;
  const isAuthPage = pathname.startsWith('/auth');

  if (isAuthPage) {
    if (isAuth) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return null;
  }

  if (!isAuth && !refresh_token) {
    let from = request.nextUrl.pathname;
    if (request.nextUrl.search) {
      from += request.nextUrl.search;
    }
    return NextResponse.redirect(
      new URL(
        `/auth/sign-in?redirectUrl=${encodeURIComponent(from)}`,
        request.url
      )
    );
  }
  let token = null;
  if (!isAuth && refresh_token) {
    await fetch(`${process.env.API_BASE_URL}/auth/access-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: refresh_token }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          // console.log(data);
          token = data?.accesstoken;
        }
      })
      .catch((error) => {
        if (error) console.error(error);
        NextResponse.next().cookies.delete('refresh_token');
        return NextResponse.redirect(new URL(`/auth/sign-in`, request.url));
      });
  }

  // Setting cookies on the response using the `ResponseCookies` API
  const response = NextResponse.next();
  if (token) {
    response.headers.set('Authorization', `Bearer ${token}`);
    response.cookies.set({
      name: 'access_token',
      value: token,
      expires: expiresIn6hrs,
    });
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|.*\\.svg$).*)', // '/.(.*)$/',
  ],
};

// proxy.ts

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { parse } from 'cookie';
import { checkServerSession } from './lib/api/serverApi';

// ⬆️ ДОДАНО приватні маршрути /notes та /notes/filter
const privateRoutes = ['/profile', '/notes', '/notes/filter'];

const publicRoutes = ['/sign-in', '/sign-up'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  // ⬆️ Логіка залишилась, але тепер вона враховує нові приватні маршрути
  const isPrivateRoute = privateRoutes.some(route =>
    pathname.startsWith(route),
  );

  // Якщо accessToken відсутній
  if (!accessToken) {
    if (refreshToken) {
      const data = await checkServerSession();
      const setCookie = data.headers['set-cookie'];

      if (setCookie) {
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

        for (const cookieStr of cookieArray) {
          const parsed = parse(cookieStr);
          const options = {
            expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
            path: parsed.Path,
            maxAge: Number(parsed['Max-Age']),
          };

          if (parsed.accessToken)
            cookieStore.set('accessToken', parsed.accessToken, options);

          if (parsed.refreshToken)
            cookieStore.set('refreshToken', parsed.refreshToken, options);
        }

        // 🔁 Логіку не змінював, лише залишив як в тебе — все ок
        if (isPublicRoute) {
          return NextResponse.redirect(new URL('/', request.url), {
            headers: { Cookie: cookieStore.toString() },
          });
        }

        if (isPrivateRoute) {
          return NextResponse.next({
            headers: { Cookie: cookieStore.toString() },
          });
        }
      }
    }

    // 🟢 НЕ ЗМІНЮВАЛОСЬ — просто лишилось логічно правильним
    if (isPublicRoute) return NextResponse.next();

    if (isPrivateRoute)
      return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // 🟢 НЕ ЗМІНЮВАЛОСЬ
  if (isPublicRoute) return NextResponse.redirect(new URL('/', request.url));

  if (isPrivateRoute) return NextResponse.next();

  // ⬇️ ДОДАНО ВАЖЛИВО
  // Раніше middleware міг "зависати", якщо маршрут не приватний і не публічний.
  // Тепер всі інші запити просто пропускаються.
  return NextResponse.next();
}

// ⬇️ ДОДАНО matcher для notes і notes/filter
export const config = {
  matcher: [
    '/profile/:path*', // було
    '/notes/:path*', // ДОДАНО
    '/notes/filter/:path*', // ДОДАНО
    '/sign-in',
    '/sign-up',
  ],
};

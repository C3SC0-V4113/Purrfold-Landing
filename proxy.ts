import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import {
  detectPreferredLocale,
  getRootRedirectPath,
  getUnsupportedLocaleRedirectPath,
  shouldBypassProxy,
} from '@/i18n/proxy';
import { routing } from '@/i18n/routing';

import type { NextRequest } from 'next/server';

const handleI18nRouting = createMiddleware(routing);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (shouldBypassProxy(pathname)) {
    return NextResponse.next();
  }

  if (pathname === '/') {
    const redirectUrl = new URL(
      getRootRedirectPath(request.headers.get('accept-language')),
      request.url
    );
    return NextResponse.redirect(redirectUrl);
  }

  const normalizedUnsupportedPath = getUnsupportedLocaleRedirectPath(pathname);

  if (normalizedUnsupportedPath) {
    return NextResponse.redirect(new URL(normalizedUnsupportedPath, request.url));
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};

export { detectPreferredLocale, getRootRedirectPath, shouldBypassProxy };

export default proxy;

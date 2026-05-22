import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export function middleware(
  request: NextRequest
) {

  const adminLogged =
    request.cookies.get(
      "admin_logged_in"
    );

  const isAdminPage =
    request.nextUrl.pathname.startsWith(
      "/admin/dashboard"
    );

  if (
    isAdminPage &&
    !adminLogged
  ) {

    return NextResponse.redirect(
      new URL(
        "/admin/login",
        request.url
      )
    );
  }

  return NextResponse.next();
}

export const config = {

  matcher: [
    "/admin/dashboard/:path*",
  ],

};
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname; //find the users current path
  console.log("middleware: my current path:" + path);

  const isPublicPath =
    path === "/login" || path === "/signup" || path === "/verifyemail";
  const token = request.cookies.get("token")?.value || "";
  console.log("meddleware: my token:" + token);

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.url)); // move to this path
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url)); // move to this path
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/login", "/signup", "/verifyemail", "/profile/:path*"],
};


import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. Protect all /admin routes
    if (pathname.startsWith("/admin")) {
        const token = request.cookies.get("session")?.value;

        if (!token) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        const payload = await verifyToken(token);

        if (!payload) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        // 2. Role-Based Access Control
        const userRole = payload.role as string;

        // Admin-only routes (Write operations)
        if (
            (pathname.startsWith("/admin/servicios/") || // Blocks /new and /:id but allows /servicios
                pathname === "/admin/servicios/new") && // Redundant but explicit
            userRole !== "admin"
        ) {
            return NextResponse.redirect(new URL("/admin/servicios", request.url));
        }

        return NextResponse.next();
    }

    // 3. Redirect logged-in users away from /login
    if (pathname.startsWith("/login")) {
        const token = request.cookies.get("session")?.value;
        if (token && await verifyToken(token)) {
            return NextResponse.redirect(new URL("/admin", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/login"],
};

import { auth } from "@/auth";

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard") ||
        req.nextUrl.pathname.startsWith("/items") ||
        req.nextUrl.pathname.startsWith("/billing") ||
        req.nextUrl.pathname.startsWith("/stock") ||
        req.nextUrl.pathname.startsWith("/reports") ||
        req.nextUrl.pathname.startsWith("/settings");
    const isLoginPage = req.nextUrl.pathname.startsWith("/login");

    if (isOnDashboard) {
        if (isLoggedIn) return; // Allow
        return Response.redirect(new URL("/login", req.nextUrl)); // Redirect to login
    } else if (isLoggedIn && isLoginPage) {
        return Response.redirect(new URL("/dashboard", req.nextUrl)); // Redirect to dashboard
    }

    return;
});

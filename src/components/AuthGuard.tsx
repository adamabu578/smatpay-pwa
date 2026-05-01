"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const protectedRoutes = [
  "/dashboard",
  "/airtime",
  "/data",
  "/fund-wallet",
  "/profile",
  "/services",
  "/transactions",
  "/wallet"
];

const publicOnlyRoutes = [
  "/login",
  "/register",
  "/onboarding"
];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Only run on the client side
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("token");
    const hasValidToken = token && token !== "undefined" && token !== "null";
    
    // Check if the current route is protected or public-only
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
    const isPublicOnlyRoute = publicOnlyRoutes.includes(pathname);

    if (isProtectedRoute && !hasValidToken) {
      // Redirect to login if accessing protected route without valid token
      router.replace("/login");
    } else if (isPublicOnlyRoute && hasValidToken) {
      // Redirect to dashboard if logged in and trying to access login/register
      router.replace("/dashboard");
    } else {
      setIsAuthorized(true);
    }
  }, [pathname, router]);

  // Don't render children until authorized
  if (!isAuthorized) {
    return (
      <div className="flex h-full min-h-screen w-full items-center justify-center bg-[#1E1544]">
        <div className="w-10 h-10 border-4 border-[#7C7AFF] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return <>{children}</>;
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  FileText,
  Settings,
  LogOut,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/items", label: "Items", icon: Package },
  { href: "/stock", label: "Stock", icon: TrendingUp },
  { href: "/billing", label: "Billing", icon: ShoppingCart },
  { href: "/reports", label: "Reports", icon: FileText },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ isMobile = false }: { isMobile?: boolean }) {
  const pathname = usePathname();

  return (
    <aside className={cn(
      "h-full flex-col border-r bg-card text-card-foreground",
      isMobile ? "flex w-full" : "hidden md:flex w-64"
    )}>
      <div className="p-6 border-b flex items-center gap-3">
        <div className="bg-white p-1.5 rounded-lg shadow-sm">
          <Image src="/logo.png" alt="Logo" width={40} height={40} className="object-contain" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-wide text-primary leading-tight">
            OM PRAKASH
          </h1>
          <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Textiles</p>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          onClick={() => signOut()}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}


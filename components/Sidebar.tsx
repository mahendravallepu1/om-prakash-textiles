"use client";

import Link from "next/link";
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

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-full w-64 bg-gray-900 text-white flex flex-col border-r border-gray-800">
      <div className="p-4 border-b border-gray-800">
        <h1 className="text-lg font-bold tracking-wide">
          OM PRAKASH TEXTILES
        </h1>
        <p className="text-xs text-gray-400 mt-1">Inventory & Billing</p>
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
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-gray-800 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-gray-800">
        <Button
          variant="outline"
          className="w-full justify-center gap-2 border-gray-700 text-gray-200 hover:bg-gray-800 hover:text-white"
          onClick={() => signOut()}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}


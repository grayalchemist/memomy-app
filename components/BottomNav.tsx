"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CalendarDays, HeartPulse, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", icon: Home, label: "Home" },
    { href: "/calendar", icon: CalendarDays, label: "Calendar" },
    { href: "/check-in", icon: HeartPulse, label: "Wellbeing" },
    { href: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 pb-safe">
      <div className="mx-auto max-w-md px-4 pb-2">
        <div className="bg-glass flex h-16 items-center justify-around rounded-4xl border border-hairline shadow-lg">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex h-12 flex-1 items-center justify-center gap-2 rounded-3xl px-3 transition-all duration-300",
                  isActive
                    ? "bg-primary/10 text-primary shadow-sm"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                )}
              >
                <Icon
                  className={cn("size-5 transition-transform", isActive && "scale-105")}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                {isActive && (
                  <span className="text-xs font-semibold tracking-tight">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

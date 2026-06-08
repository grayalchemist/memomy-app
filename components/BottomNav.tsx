"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CalendarDays, HeartPulse, User } from "lucide-react";

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", icon: Home, label: "Home" },
    { href: "/calendar", icon: CalendarDays, label: "Calendar" },
    { href: "/check-in", icon: HeartPulse, label: "Wellbeing" },
    { href: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border/40 pb-safe z-50">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors
                ${isActive ? "text-primary" : "text-muted-foreground hover:text-primary/70"}`}
            >
              <Icon className={`w-6 h-6 ${isActive ? "fill-primary/10" : ""}`} />
              <span className={`text-[10px] font-medium ${isActive ? "font-bold" : ""}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
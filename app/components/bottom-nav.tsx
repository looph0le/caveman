"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Dumbbell, Activity } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname() || "/";

  const nav = [
    { label: "Dashboard", href: "/dashboard", Icon: Home },
    { label: "Tracker", href: "/tracker", Icon: Activity },
    { label: "Workouts", href: "/workoutplan", Icon: Dumbbell },
  ];

  return (
    <nav
      aria-label="Primary"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50"
    >
      <div
        className="max-w-screen-lg mx-auto px-4 pb-safe bg-transparent"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="backdrop-blur bg-black/5 border rounded-t-2xl shadow-lg py-2 px-3 flex justify-between items-center">
          {nav.map(({ label, href, Icon }) => {
            const active = pathname === href || (href !== '/' && pathname.startsWith(href));
            return (
              <Link key={href} href={href} aria-label={label} className="flex-1">
                <div
                  className={`flex flex-col items-center justify-center gap-0.5 py-2 px-3 rounded-lg transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${active
                    ? 'text-green-500/90'
                    : 'text-gray-600 dark:text-gray-300'
                    }`}
                  aria-current={active ? 'page' : undefined}
                >
                  <Icon className={`w-5 h-5 ${active ? 'scale-110' : ''}`} />
                  <span className="text-[11px] leading-none mt-0.5">{label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

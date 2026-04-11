"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  LayoutDashboard,
  Users,
  UserCog,
  BarChart3,
  CheckSquare,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { ExaiFullLogo, ExaiXLogo } from "@/app/components/ExaiLogo";
import { useEffect, useState, useSyncExternalStore } from "react";

function useIsMdUp() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia("(min-width: 768px)");
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(min-width: 768px)").matches,
    () => true
  );
}

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { name: "Teams", icon: Users, path: "/admin/teams" },
  { name: "Participants", icon: UserCog, path: "/admin/users" },
  { name: "Evaluation", icon: CheckSquare, path: "/admin/teams" },
  { name: "Analytics", icon: BarChart3, path: "/admin/analytics" },
];

function pathActive(pathname: string, itemPath: string): boolean {
  if (itemPath === "/admin") return pathname === "/admin";
  return pathname === itemPath || pathname.startsWith(`${itemPath}/`);
}

export default function AdminDashboardShell({
  children,
  adminUsername,
  adminRole,
}: {
  children: React.ReactNode;
  adminUsername: string;
  adminRole: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isMdUp = useIsMdUp();
  /** Desktop: wide vs icon rail */
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  /** Mobile: slide-over drawer */
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  useEffect(() => {
    setMobileDrawerOpen(false);
  }, [pathname]);

  const showNavLabels = isMdUp ? sidebarExpanded : mobileDrawerOpen;

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Mobile top bar */}
      <header className="fixed top-0 left-0 right-0 z-[45] flex h-14 items-center gap-3 border-b border-[#14b4ba]/20 bg-slate-900/95 px-4 backdrop-blur-xl md:hidden">
        <button
          type="button"
          onClick={() => setMobileDrawerOpen(true)}
          className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800/70 hover:text-[#14b4ba] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14b4ba]/45"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <span className="font-bold text-slate-100">EXAI Admin</span>
      </header>

      {/* Mobile drawer backdrop */}
      {mobileDrawerOpen && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setMobileDrawerOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen border-r border-[#14b4ba]/20 bg-slate-900/80 backdrop-blur-xl transition-transform duration-300 ease-out md:transition-[width,transform] ${
          mobileDrawerOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } w-[min(100vw-3rem,16rem)] ${sidebarExpanded ? "md:w-64" : "md:w-20"}`}
      >
        <div className="flex h-full flex-col">
          <div className="border-b border-[#14b4ba]/20 p-6">
            <div className="flex items-center justify-between gap-2">
              {showNavLabels ? (
                <ExaiFullLogo size="small" />
              ) : (
                <ExaiXLogo className="h-8 w-8 shrink-0" />
              )}
              <button
                type="button"
                onClick={() => {
                  if (isMdUp) {
                    setSidebarExpanded((v) => !v);
                  } else {
                    setMobileDrawerOpen(false);
                  }
                }}
                className="shrink-0 rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800/70 hover:text-[#14b4ba] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14b4ba]/45"
                aria-label={isMdUp ? (sidebarExpanded ? "Collapse sidebar" : "Expand sidebar") : "Close menu"}
              >
                {isMdUp ? (
                  sidebarExpanded ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )
                ) : (
                  <X className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <nav className="flex-1 space-y-2 overflow-y-auto p-4">
            {navItems.map((item) => {
              const isActive = pathActive(pathname, item.path);
              return (
                <Link
                  key={item.name + item.path}
                  href={item.path}
                  onClick={() => {
                    if (!isMdUp) setMobileDrawerOpen(false);
                  }}
                  className="block"
                >
                  <motion.div
                    whileHover={{ x: 4 }}
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200 ${
                      isActive
                        ? "border border-[#14b4ba]/50 bg-gradient-to-r from-[#14b4ba]/20 to-[#079db5]/20 shadow-[0_0_20px_rgba(20,180,186,0.2)]"
                        : "border border-transparent hover:border-slate-700/80 hover:bg-slate-800/60"
                    }`}
                  >
                    <item.icon
                      className={`h-5 w-5 shrink-0 ${isActive ? "text-[#14b4ba]" : "text-slate-400"}`}
                    />
                    {showNavLabels && (
                      <span
                        className={`font-bold ${isActive ? "text-[#14b4ba]" : "text-slate-300"}`}
                      >
                        {item.name}
                      </span>
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-[#14b4ba]/20 p-4">
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#14b4ba] to-[#079db5]">
                <span className="text-xs font-black text-white">AD</span>
              </div>
              {showNavLabels && (
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold capitalize text-slate-100">
                    {adminRole.replaceAll("_", " ")}
                  </p>
                  <p className="truncate text-xs text-slate-400" title={adminUsername}>
                    {adminUsername}
                  </p>
                </div>
              )}
            </div>
            {showNavLabels && (
              <>
                <Link href="/" className="mt-2 block rounded-lg px-4 py-2 text-sm font-bold text-slate-400 transition-colors hover:bg-slate-800/60 hover:text-[#14b4ba] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14b4ba]/40">
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    Back to Home
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={() => void handleLogout()}
                  className="mt-2 flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold text-slate-400 transition-colors hover:bg-slate-800/60 hover:text-red-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </aside>

      <main
        className={`transition-[margin,padding] duration-300 ease-out md:pt-0 ${
          sidebarExpanded ? "md:ml-64" : "md:ml-20"
        } ml-0 pt-14`}
      >
        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}

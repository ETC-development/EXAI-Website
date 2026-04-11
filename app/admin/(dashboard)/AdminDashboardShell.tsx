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
import { ExaiFullLogo } from "@/app/components/ExaiLogo";
import { useState } from "react";

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <aside
        className={`fixed top-0 left-0 h-screen bg-slate-900/80 backdrop-blur-xl border-r border-[#14b4ba]/20 transition-all duration-300 z-50 ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-[#14b4ba]/20">
            <div className="flex items-center justify-between">
              {isSidebarOpen ? (
                <ExaiFullLogo size="small" />
              ) : (
                <div className="w-8 h-8 bg-gradient-to-br from-[#14b4ba] to-[#079db5] rounded-lg flex items-center justify-center">
                  <span className="text-white font-black text-sm">EX</span>
                </div>
              )}
              <button
                type="button"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-slate-400 hover:text-[#14b4ba] transition-colors"
              >
                {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
              const isActive = pathActive(pathname, item.path);
              return (
                <Link key={item.name + item.path} href={item.path}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-[#14b4ba]/20 to-[#079db5]/20 border border-[#14b4ba]/50 shadow-[0_0_20px_rgba(20,180,186,0.2)]"
                        : "hover:bg-slate-800/50"
                    }`}
                  >
                    <item.icon
                      className={`w-5 h-5 ${isActive ? "text-[#14b4ba]" : "text-slate-400"}`}
                    />
                    {isSidebarOpen && (
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

          <div className="p-4 border-t border-[#14b4ba]/20">
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#14b4ba] to-[#079db5] rounded-full flex items-center justify-center">
                <span className="text-white font-black text-xs">AD</span>
              </div>
              {isSidebarOpen && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-100 capitalize">
                    {adminRole.replaceAll("_", " ")}
                  </p>
                  <p className="text-xs text-slate-400 truncate" title={adminUsername}>
                    {adminUsername}
                  </p>
                </div>
              )}
            </div>
            {isSidebarOpen && (
              <>
                <Link href="/" className="block">
                  <button
                    type="button"
                    className="w-full mt-2 flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-[#14b4ba] transition-colors rounded-lg hover:bg-slate-800/50"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    <span className="text-sm font-bold">Back to Home</span>
                  </button>
                </Link>
                <button
                  type="button"
                  onClick={() => void handleLogout()}
                  className="w-full mt-2 flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-red-400 transition-colors rounded-lg hover:bg-slate-800/50"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm font-bold">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </aside>

      <main className={`transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-20"}`}>
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}

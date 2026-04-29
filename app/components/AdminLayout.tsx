"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  Home
} from "lucide-react";
import { ExaiFullLogo } from "./ExaiLogo";
import { useState } from "react";
import { Button } from "./ui/button";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { name: "Teams", icon: Users, path: "/admin/teams" },
  { name: "Participants", icon: UserCog, path: "/admin/users" },
  { name: "Evaluation", icon: CheckSquare, path: "/admin/evaluation" },
  { name: "Analytics", icon: BarChart3, path: "/admin/analytics" },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-slate-900/80 backdrop-blur-xl border-r border-[#14b4ba]/20 transition-all duration-300 z-50 ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
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
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-slate-400 hover:text-[#14b4ba] transition-colors"
              >
                {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link key={item.path} href={item.path}>
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

          {/* User Section */}
          <div className="p-4 border-t border-[#14b4ba]/20">
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#14b4ba] to-[#079db5] rounded-full flex items-center justify-center">
                <span className="text-white font-black text-xs">AD</span>
              </div>
              {isSidebarOpen && (
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-100">Admin</p>
                  <p className="text-xs text-slate-400">admin@exai.dz</p>
                </div>
              )}
            </div>
            {isSidebarOpen && (
              <>
                <Link href="/" className="block mt-2">
                  <Button variant="adminMuted" size="sm" className="w-full justify-start gap-2">
                    <Home className="w-4 h-4" />
                    Back to Home
                  </Button>
                </Link>
                <Link href="/admin/login" className="block mt-2">
                  <Button variant="adminDanger" size="sm" className="w-full justify-start gap-2">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

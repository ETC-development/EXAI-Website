import { redirect } from "next/navigation";
import { getAdminDashboardSession } from "@/lib/admin/session-server";
import AdminDashboardShell from "./AdminDashboardShell";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminDashboardSession();
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <AdminDashboardShell adminUsername={session.username} adminRole={session.role}>
      {children}
    </AdminDashboardShell>
  );
}

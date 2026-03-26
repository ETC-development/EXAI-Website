export type AdminRole = "staff" | "super_admin";

type AdminCredential = {
  username: string;
  password: string;
  role: AdminRole;
};

function getEnvVar(name: string): string | undefined {
  const value = process.env[name];
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : undefined;
}

export function getAdminCredentials(): AdminCredential[] {
  const superUsername = getEnvVar("ADMIN_SUPER_USERNAME");
  const superPassword = getEnvVar("ADMIN_SUPER_PASSWORD");

  const staff1Username = getEnvVar("ADMIN_STAFF_1_USERNAME");
  const staff1Password = getEnvVar("ADMIN_STAFF_1_PASSWORD");

  const staff2Username = getEnvVar("ADMIN_STAFF_2_USERNAME");
  const staff2Password = getEnvVar("ADMIN_STAFF_2_PASSWORD");

  const creds: AdminCredential[] = [];
  if (superUsername && superPassword) {
    creds.push({ username: superUsername, password: superPassword, role: "super_admin" });
  }
  if (staff1Username && staff1Password) {
    creds.push({ username: staff1Username, password: staff1Password, role: "staff" });
  }
  if (staff2Username && staff2Password) {
    creds.push({ username: staff2Username, password: staff2Password, role: "staff" });
  }

  return creds;
}

export function getAdminCookieSecret(): string | undefined {
  return getEnvVar("ADMIN_COOKIE_SECRET");
}


import RegistrationSuccessClient from "./RegistrationSuccessClient";

export default async function RegistrationSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; inviteCode?: string; soloCode?: string }>;
}) {
  const query = await searchParams;
  return (
    <RegistrationSuccessClient
      type={query.type ?? null}
      inviteCode={query.inviteCode ?? null}
      soloCode={query.soloCode ?? null}
    />
  );
}

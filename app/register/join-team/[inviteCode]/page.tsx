import JoinTeamClient from "../JoinTeamClient";

export default async function JoinTeamWithCodePage({ params }: { params: Promise<{ inviteCode: string }> }) {
  const { inviteCode } = await params;
  return <JoinTeamClient initialInviteCode={inviteCode} />;
}

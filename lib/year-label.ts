const MAP: Record<string, string> = {
  "1": "L1",
  "2": "L2",
  "3": "L3",
  "4": "L4",
  "5": "L5",
  master: "Master",
  phd: "PhD",
  other: "Other",
};

export function formatYearOfStudy(value: string | null | undefined): string {
  if (!value) return "—";
  return MAP[value] ?? value;
}

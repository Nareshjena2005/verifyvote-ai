import { AI_ASSESSMENTS, HUMAN_STATUSES, TONE_CLASSES } from "@/lib/statusMeta";

// kind="ai" renders a preliminary AI assessment; kind="human" renders a reviewer decision.
export default function StatusBadge({ kind = "human", value }) {
  const meta = (kind === "ai" ? AI_ASSESSMENTS : HUMAN_STATUSES)[value];
  if (!meta) return null;
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${TONE_CLASSES[meta.tone]}`}
    >
      {kind === "ai" ? "AI: " : ""}
      {meta.label}
    </span>
  );
}

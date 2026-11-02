// Display metadata for AI assessments and human review decisions.
// The two vocabularies are intentionally separate: an AI assessment is
// preliminary; a human decision is the only "final" status.

export const AI_ASSESSMENTS = {
  supported: { label: "Supported by available evidence", tone: "green" },
  contradicted: { label: "Contradicted by available evidence", tone: "red" },
  misleading: { label: "Misleading or missing context", tone: "amber" },
  insufficient: { label: "Insufficient evidence", tone: "slate" },
  conflicting: { label: "Conflicting evidence", tone: "violet" },
};

export const HUMAN_STATUSES = {
  pending: { label: "Awaiting review", tone: "slate" },
  verified: { label: "Verified", tone: "green" },
  false: { label: "False", tone: "red" },
  misleading: { label: "Misleading", tone: "amber" },
  inconclusive: { label: "Inconclusive", tone: "slate" },
  needs_evidence: { label: "Needs more evidence", tone: "violet" },
};

// Decisions a reviewer may choose (everything except "pending").
export const REVIEW_DECISIONS = Object.keys(HUMAN_STATUSES).filter((k) => k !== "pending");

export const TONE_CLASSES = {
  green: "bg-emerald-50 text-emerald-800 ring-emerald-600/20 dark:bg-emerald-950 dark:text-emerald-300 dark:ring-emerald-400/30",
  red: "bg-red-50 text-red-800 ring-red-600/20 dark:bg-red-950 dark:text-red-300 dark:ring-red-400/30",
  amber: "bg-amber-50 text-amber-900 ring-amber-600/20 dark:bg-amber-950 dark:text-amber-300 dark:ring-amber-400/30",
  violet: "bg-violet-50 text-violet-800 ring-violet-600/20 dark:bg-violet-950 dark:text-violet-300 dark:ring-violet-400/30",
  slate: "bg-slate-100 text-slate-700 ring-slate-500/20 dark:bg-navy-800 dark:text-slate-300 dark:ring-slate-400/30",
};

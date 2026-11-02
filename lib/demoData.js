// SAMPLE DATA ONLY.
// Every record below is invented to demonstrate the interface. None of it is
// a real claim, a real fact-check, or a real verification result, and the
// example.org links are placeholders. Replaced by database records in Stage 2.

export const DEMO_NOTICE =
  "Sample data. These reports are invented to demonstrate the interface and are not real verification results.";

export const demoClaims = [
  {
    id: "demo-1",
    type: "text",
    claimText: "Polling stations in every district stay open until midnight on election day.",
    summary: "Claims that all polling stations nationwide close at midnight rather than at the published closing time.",
    submittedAt: "2026-10-14",
    aiAssessment: "contradicted",
    confidence: "medium",
    humanStatus: "false",
    factChecks: [
      { publisher: "Sample Fact Desk", title: "Sample: Polling hours are set per district", url: "https://example.org/sample-fact-check-1", rating: "False (sample)", date: "2026-10-10", match: "strong" },
      { publisher: "Sample Civic Lab", title: "Sample: Election day timings explained", url: "https://example.org/sample-fact-check-2", rating: "Mostly false (sample)", date: "2026-10-11", match: "approximate" },
    ],
    evidence: [
      { id: "e1", name: "Sample Election Commission notice", url: "https://example.org/sample-notice", type: "Official notice", date: "2026-10-05", excerpt: "Sample text: polling closes at 6 p.m. local time unless a district notice states otherwise.", relationship: "contradicts", note: "Sample official source." },
      { id: "e2", name: "Sample Regional Gazette", url: "https://example.org/sample-gazette", type: "News report", date: "2026-10-12", excerpt: "Sample text: one district extended hours by one hour due to flooding.", relationship: "context", note: "Explains a narrow exception; does not support a nationwide midnight closing." },
    ],
    aiAnalysis: {
      explanation: "Retrieved sources state a standard closing time well before midnight. One regional exception exists, which does not match the claim's nationwide wording.",
      unknowns: ["Whether additional district-level extensions were issued after the sources were published."],
      limitations: "Based only on the two retrieved sources and two existing fact-checks. The assessment is preliminary.",
    },
    history: [
      { at: "2026-10-14 09:12", actor: "System", from: "-", to: "Awaiting review", note: "Claim submitted." },
      { at: "2026-10-15 11:40", actor: "Sample Reviewer", from: "Awaiting review", to: "False", note: "Official notice contradicts the claim. Sample note." },
    ],
  },
  {
    id: "demo-2",
    type: "url",
    claimText: "https://example.org/sample-article-voter-roll",
    summary: "Article says millions of names were removed from voter rolls overnight.",
    submittedAt: "2026-10-16",
    aiAssessment: "misleading",
    confidence: "low",
    humanStatus: "pending",
    metadata: { title: "Sample: Voter rolls shrink", domain: "example.org", published: "2026-10-15", description: "Sample article description." },
    factChecks: [
      { publisher: "Sample Fact Desk", title: "Sample: Routine list maintenance", url: "https://example.org/sample-fact-check-3", rating: "Missing context (sample)", date: "2026-10-16", match: "approximate" },
    ],
    evidence: [
      { id: "e3", name: "Sample Registrar FAQ", url: "https://example.org/sample-registrar", type: "Official notice", date: "2026-09-30", excerpt: "Sample text: removals follow a yearly review of duplicate and outdated entries.", relationship: "context", note: "Describes a routine process; the article's totals could not be checked." },
    ],
    aiAnalysis: {
      explanation: "A routine yearly cleanup is described by an official source, which the article does not mention. The article's headline figure could not be matched to any retrieved source.",
      unknowns: ["The actual number of removals.", "Whether the removals were contested."],
      limitations: "Only one source was retrieved. Confidence is low.",
    },
    history: [{ at: "2026-10-16 18:05", actor: "System", from: "-", to: "Awaiting review", note: "Claim submitted." }],
  },
  {
    id: "demo-3",
    type: "image",
    claimText: "Photo of a ballot box being carried out of a building after polls closed.",
    summary: "Image shared with a caption alleging ballots were removed after closing.",
    submittedAt: "2026-10-17",
    aiAssessment: "insufficient",
    confidence: "low",
    humanStatus: "pending",
    factChecks: [],
    evidence: [],
    aiAnalysis: {
      explanation: "No existing fact-checks or related sources were found. Absence of results does not show the claim is true or false.",
      unknowns: ["Where and when the photo was taken.", "Whether the caption matches the photo."],
      limitations: "No image forensics provider is configured, so no edit or AI-generation check was run.",
    },
    image: {
      ocrText: "Sample OCR output: \"BALLOTS REMOVED AFTER CLOSING\"",
      ocrMatch: "The overlay text repeats the caption. It adds no independent information.",
      metadata: "Sample: no EXIF data present. This is common for images shared on social platforms and is not evidence of manipulation.",
      duplicate: "No near-duplicate found in this platform's sample set.",
      forensics: "Unavailable. Metadata anomalies and AI-image detectors are indicators only, never proof.",
    },
    history: [{ at: "2026-10-17 07:30", actor: "System", from: "-", to: "Awaiting review", note: "Claim submitted." }],
  },
  {
    id: "demo-4",
    type: "text",
    claimText: "Voters can register on election day at any polling station in the state.",
    summary: "Claims same-day registration is available everywhere in the state.",
    submittedAt: "2026-10-12",
    aiAssessment: "conflicting",
    confidence: "low",
    humanStatus: "needs_evidence",
    factChecks: [
      { publisher: "Sample Civic Lab", title: "Sample: Same-day registration rules", url: "https://example.org/sample-fact-check-4", rating: "Partly true (sample)", date: "2026-10-09", match: "strong" },
    ],
    evidence: [
      { id: "e4", name: "Sample State Portal", url: "https://example.org/sample-portal", type: "Official notice", date: "2026-08-20", excerpt: "Sample text: same-day registration is offered at designated sites only.", relationship: "contradicts", note: "Sample official source." },
      { id: "e5", name: "Sample Voter Guide", url: "https://example.org/sample-guide", type: "Reference", date: "2026-09-02", excerpt: "Sample text: eligible voters may register on election day at their home precinct.", relationship: "supports", note: "Conflicts with the portal; publication dates differ." },
    ],
    aiAnalysis: {
      explanation: "Two retrieved sources disagree on where same-day registration is available.",
      unknowns: ["Which source reflects the current rule."],
      limitations: "Sources may reflect different rule versions. A reviewer should confirm with the current official notice.",
    },
    history: [
      { at: "2026-10-12 10:00", actor: "System", from: "-", to: "Awaiting review", note: "Claim submitted." },
      { at: "2026-10-13 15:22", actor: "Sample Reviewer", from: "Awaiting review", to: "Needs more evidence", note: "Need the current official notice. Sample note." },
    ],
  },
  {
    id: "demo-5",
    type: "text",
    claimText: "Results from the regional vote will be announced on the official website by 8 p.m.",
    summary: "Claims a specific announcement time for regional results.",
    submittedAt: "2026-10-09",
    aiAssessment: "supported",
    confidence: "medium",
    humanStatus: "verified",
    factChecks: [],
    evidence: [
      { id: "e6", name: "Sample Commission schedule", url: "https://example.org/sample-schedule", type: "Official notice", date: "2026-10-01", excerpt: "Sample text: preliminary regional results will be posted at 8 p.m. local time.", relationship: "supports", note: "Sample official source." },
    ],
    aiAnalysis: {
      explanation: "One official schedule matches the claim's time and channel.",
      unknowns: ["Whether the schedule changed after publication."],
      limitations: "A single source supports the claim. No existing fact-checks were found, which is neutral.",
    },
    history: [
      { at: "2026-10-09 08:00", actor: "System", from: "-", to: "Awaiting review", note: "Claim submitted." },
      { at: "2026-10-09 13:45", actor: "Sample Reviewer", from: "Awaiting review", to: "Verified", note: "Matches the official schedule. Sample note." },
    ],
  },
];

export function getDemoClaim(id) {
  return demoClaims.find((c) => c.id === id) ?? null;
}

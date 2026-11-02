export const metadata = { title: "About and methodology" };

const sections = [
  {
    title: "How evidence is collected",
    body: [
      "We search published fact-checks for the claim, and show the publisher, rating, link, and date for each match. Strong matches are separated from approximate ones.",
      "For news links we read the page title, publisher, date, and description when the page is reachable. If something is missing we leave it blank rather than guess.",
      "For images we read any text in the picture (OCR) and available metadata, and compare that text with the claim.",
    ],
  },
  {
    title: "Verification workflow",
    body: [
      "A claim is submitted, evidence is collected, the AI compares the claim with that evidence, and a human reviewer makes the final decision. Every status change is recorded with who made it and when.",
    ],
  },
  {
    title: "AI assessment versus human verification",
    body: [
      "The AI only sees evidence we retrieved and may cite only those records. Its output is a preliminary assessment with a stated confidence. It is never shown as a verified conclusion.",
      "Only an authorized reviewer can mark a claim Verified, False, Misleading, Inconclusive, or Needs more evidence.",
    ],
  },
  {
    title: "Known limitations",
    body: [
      "No fact-check found does not mean a claim is true or false. The AI can misread evidence. Fact-check coverage varies by topic and language.",
      "Image metadata anomalies and AI-image detectors are indicators, not proof. We cannot reliably detect every edited or AI-generated image, and when no forensics provider is configured this is stated on the report.",
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="page-wrap max-w-3xl py-12">
      <h1 className="font-serif text-3xl font-semibold text-navy-900 dark:text-white">About and methodology</h1>
      <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">
        What VerifyVote AI does, what it does not do, and how to read a report.
      </p>
      <div className="mt-10 space-y-10">
        {sections.map((s) => (
          <section key={s.title}>
            <h2 className="font-serif text-2xl font-semibold text-navy-900 dark:text-white">{s.title}</h2>
            {s.body.map((p) => (
              <p key={p} className="mt-3 max-w-prose leading-relaxed text-slate-700 dark:text-slate-300">{p}</p>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}

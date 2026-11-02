import Link from "next/link";
import { FileSearch, Scale, UserCheck, Eye } from "lucide-react";
import QuickCheck from "@/components/QuickCheck";
import ReportCard from "@/components/ReportCard";
import DemoBanner from "@/components/DemoBanner";
import { demoClaims } from "@/lib/demoData";

const features = [
  { icon: FileSearch, title: "Existing fact-checks first", text: "We search published fact-checks and show the publisher, rating, and date for each match." },
  { icon: Eye, title: "Every source visible", text: "Each piece of evidence links to its origin and is marked as supporting, contradicting, or context." },
  { icon: Scale, title: "AI kept in its place", text: "The AI summarizes retrieved evidence only. Its assessment is labeled preliminary." },
  { icon: UserCheck, title: "Humans decide", text: "Only an authorized reviewer can set a final status, and every change is logged." },
];

const steps = [
  { title: "Submit", text: "Paste a claim, a news link, or upload an image." },
  { title: "Collect", text: "We look up existing fact-checks and read page details or image text." },
  { title: "Analyze", text: "The AI compares the claim with the evidence it was given and lists what is unknown." },
  { title: "Review", text: "A human reviewer checks the evidence and records the final decision." },
];

export default function Home() {
  return (
    <>
      <section className="bg-navy-900 text-white">
        <div className="page-wrap py-20 sm:py-28">
          <h1 className="max-w-3xl font-serif text-4xl font-semibold leading-tight sm:text-6xl">
            Don&apos;t Just Share. Verify.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-300">
            VerifyVote AI checks election-related claims against existing fact-checks and shows exactly what
            evidence was found, what is missing, and what a human reviewer decided.
          </p>
          <div className="mt-8">
            <QuickCheck />
          </div>
        </div>
      </section>

      <section className="page-wrap py-16" aria-labelledby="features-h">
        <h2 id="features-h" className="font-serif text-2xl font-semibold text-navy-900 dark:text-white">
          Built to show its work
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, text }) => (
            <div key={title}>
              <Icon size={22} className="text-teal-600" aria-hidden />
              <h3 className="mt-3 font-semibold text-navy-900 dark:text-white">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-16 dark:border-navy-700 dark:bg-navy-900" aria-labelledby="how-h">
        <div className="page-wrap">
          <h2 id="how-h" className="font-serif text-2xl font-semibold text-navy-900 dark:text-white">How it works</h2>
          <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-600 text-sm font-semibold text-white">{i + 1}</span>
                <div>
                  <h3 className="font-semibold text-navy-900 dark:text-white">{s.title}</h3>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="page-wrap py-16" aria-labelledby="recent-h">
        <div className="flex items-end justify-between gap-4">
          <h2 id="recent-h" className="font-serif text-2xl font-semibold text-navy-900 dark:text-white">Recent public reports</h2>
          <Link href="/dashboard" className="text-sm font-medium text-teal-700 hover:underline dark:text-teal-300">View all</Link>
        </div>
        <div className="mt-4"><DemoBanner /></div>
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {demoClaims.slice(0, 3).map((c) => <ReportCard key={c.id} claim={c} />)}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50 py-16 dark:border-navy-700 dark:bg-navy-900" aria-labelledby="trust-h">
        <div className="page-wrap grid gap-8 lg:grid-cols-2">
          <div>
            <h2 id="trust-h" className="font-serif text-2xl font-semibold text-navy-900 dark:text-white">Transparency and limits</h2>
            <p className="mt-3 max-w-prose text-slate-600 dark:text-slate-400">
              No result is not the same as false. If no fact-check exists, we say the evidence is insufficient
              rather than guess.
            </p>
          </div>
          <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <li>AI assessments are preliminary and can be wrong.</li>
            <li>Image checks are indicators, not proof. We cannot reliably detect every edited or AI-generated image.</li>
            <li>Coverage depends on which fact-checkers have published on a topic.</li>
            <li>Public reports never show who submitted a claim.</li>
          </ul>
        </div>
      </section>
    </>
  );
}

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-navy-700 dark:bg-navy-900">
      <div className="page-wrap flex flex-col gap-4 py-8 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between dark:text-slate-400">
        <p className="max-w-xl">
          VerifyVote AI collects evidence and shows its work. AI assessments are preliminary; only a human
          reviewer's decision is final. Not affiliated with any election authority.
        </p>
        <nav aria-label="Footer" className="flex gap-5">
          <Link href="/about" className="hover:underline">Methodology</Link>
          <Link href="/submit" className="hover:underline">Check a claim</Link>
          <Link href="/dashboard" className="hover:underline">My claims</Link>
        </nav>
      </div>
    </footer>
  );
}

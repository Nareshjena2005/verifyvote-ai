import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-wrap py-24 text-center">
      <h1 className="font-serif text-3xl font-semibold text-navy-900 dark:text-white">Page not found</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-400">
        This report or page does not exist. Check the link, or browse the reports below.
      </p>
      <Link href="/dashboard" className="btn btn-navy mt-6">Browse reports</Link>
    </div>
  );
}

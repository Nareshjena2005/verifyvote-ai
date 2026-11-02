"use client";

export default function Error({ reset }) {
  return (
    <div className="page-wrap py-24 text-center" role="alert">
      <h1 className="font-serif text-3xl font-semibold text-navy-900 dark:text-white">Something went wrong</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-400">
        The page could not be loaded. Try again; if it keeps failing, come back later.
      </p>
      <button onClick={reset} className="btn btn-navy mt-6">Try again</button>
    </div>
  );
}

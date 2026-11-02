import ClaimForm from "@/components/ClaimForm";

export const metadata = { title: "Check a claim" };

export default async function SubmitPage({ searchParams }) {
  const { claim } = await searchParams;
  const initial = typeof claim === "string" ? claim.slice(0, 2000) : "";

  return (
    <div className="page-wrap max-w-3xl py-12">
      <h1 className="font-serif text-3xl font-semibold text-navy-900 dark:text-white">Check a claim</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">
        Submit text, a news link, or an image. We search existing fact-checks and show every source we used.
      </p>
      <div className="mt-8">
        <ClaimForm initialClaim={initial} />
      </div>
    </div>
  );
}

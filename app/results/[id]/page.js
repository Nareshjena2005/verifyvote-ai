import Link from "next/link";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { connectToDatabase } from "@/lib/mongodb";
import Claim from "@/models/Claim";
import { HUMAN_STATUSES, AI_ASSESSMENTS } from "@/lib/statusMeta";

export default async function ResultsPage({ params }) {
  const { id } = await params;
  
  // Database se us specific ID wala claim fetch karo
  await connectToDatabase();
  const claim = await Claim.findById(id).lean();

  // Agar claim nahi mila (galat ID)
  if (!claim) {
    return (
      <div className="page-wrap py-20 text-center">
        <h1 className="text-2xl font-bold">Report not found</h1>
        <p className="mt-2 text-slate-500">This claim does not exist in our database.</p>
        <Link href="/dashboard" className="btn btn-primary mt-6">Back to dashboard</Link>
      </div>
    );
  }

  // Status ke labels nikalna
  const humanStatus = HUMAN_STATUSES[claim.humanStatus] || HUMAN_STATUSES.pending;
  const aiStatus = AI_ASSESSMENTS[claim.aiAssessment] || AI_ASSESSMENTS.insufficient;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/dashboard"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground focus-ring rounded"
      >
        <ArrowLeft className="h-4 w-4" /> Back to dashboard
      </Link>

      <div className="mb-2 flex flex-wrap items-center gap-3">
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${
          humanStatus.tone === 'green' ? 'bg-emerald-100 text-emerald-800' : 
          humanStatus.tone === 'red' ? 'bg-red-100 text-red-800' : 
          'bg-slate-100 text-slate-700'
        }`}>
          {humanStatus.label}
        </span>
        <span className="text-sm text-muted-foreground">
          Submitted on {new Date(claim.createdAt).toLocaleDateString()}
        </span>
      </div>

      <h1 className="font-serif text-2xl font-bold leading-snug sm:text-3xl">
        {claim.summary}
      </h1>

      <div className="mt-8 space-y-6">
        {/* Original Claim Card */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-navy-700 dark:bg-navy-900">
          <div className="p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Original claim
            </h2>
            <p className="mt-2 leading-relaxed">{claim.claimText}</p>
            {claim.submittedUrl && (
              <p className="mt-2 text-sm text-teal-600">
                Source URL: <a href={claim.submittedUrl} target="_blank" rel="noopener noreferrer" className="underline">{claim.submittedUrl}</a>
              </p>
            )}
          </div>
        </div>

        {/* AI Assessment Card */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-navy-700 dark:bg-navy-900">
          <div className="p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Preliminary AI assessment
            </h2>
            <div className="mt-3 flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm dark:border-amber-900/40 dark:bg-amber-900/20">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
              <p>
                This is an AI-generated preliminary assessment, not a verified fact-check conclusion. 
                {claim.aiAssessment === 'pending' && " AI analysis is not yet complete."}
              </p>
            </div>
            <p className="mt-3 font-medium">
              Status: {aiStatus.label}
            </p>
            
            {/* AI Reasoning YAHAN DIKHEGI */}
            {claim.aiExplanation && (
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                <strong>AI Reasoning:</strong> {claim.aiExplanation}
              </p>
            )}
          </div>
        </div>

        {/* Reviewer Decision Card */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-navy-700 dark:bg-navy-900">
          <div className="p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Reviewer decision
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              A human reviewer has marked this claim as <strong>{humanStatus.label}</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
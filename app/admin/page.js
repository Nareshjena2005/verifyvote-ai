import AdminClient from "@/components/AdminClient";
import { connectToDatabase } from "@/lib/mongodb";
import Claim from "@/models/Claim";

export const metadata = { title: "Reviewer Dashboard" };

export default async function AdminPage() {
  await connectToDatabase();
  
  // Database se saare claims fetch karo
  const dbClaims = await Claim.find({}).sort({ createdAt: -1 }).lean();

  // UI ke hisaab se format karo
  const formattedClaims = dbClaims.map((c) => ({
    id: c._id.toString(),
    summary: c.summary || c.claimText,
    claimText: c.claimText,
    type: c.type,
    submittedAt: new Date(c.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    aiAssessment: c.aiAssessment || "pending",
    humanStatus: c.humanStatus || "pending",
    confidence: "Low", // AI stage mein aayega
    aiAnalysis: { explanation: "AI Analysis will be connected in Stage 4." },
    evidence: [], 
    history: [
      {
        at: new Date(c.createdAt).toLocaleDateString('en-GB'),
        actor: "System",
        from: "Submitted",
        to: c.humanStatus === "pending" ? "Pending review" : c.humanStatus,
        note: "Claim submitted to the platform.",
      }
    ],
  }));

  return (
    <div className="page-wrap max-w-6xl py-10">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-navy-900 dark:text-white">Reviewer dashboard</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Review claims, inspect evidence, and record final decisions.
        </p>
      </div>
      <AdminClient initialClaims={formattedClaims} />
    </div>
  );
}
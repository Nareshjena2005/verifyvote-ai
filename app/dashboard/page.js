import Link from "next/link";
import DashboardClient from "@/components/DashboardClient";
import { connectToDatabase } from "@/lib/mongodb";
import Claim from "@/models/Claim";

export const metadata = { title: "My claims" };

// Ye function ab Server par chalega aur direct Database se baat karega
export default async function DashboardPage() {
  await connectToDatabase();
  
  // Database se saare claims laao, naye sabse pehle
  const dbClaims = await Claim.find({}).sort({ createdAt: -1 }).lean();

  // Frontend UI ke hisaab se data format karo
  const formattedClaims = dbClaims.map((c) => ({
    id: c._id.toString(),
    summary: c.summary || c.claimText,
    claimText: c.claimText,
    type: c.type,
    submittedAt: new Date(c.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    aiAssessment: c.aiAssessment || "pending",
    humanStatus: c.humanStatus || "pending",
  }));

  return (
    <div className="page-wrap max-w-4xl space-y-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-navy-900 dark:text-white">My claims</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Track what you submitted and what reviewers decided.</p>
        </div>
        <Link href="/submit" className="btn btn-primary">Check a claim</Link>
      </div>
      
      {/* Yahan humne formattedClaims (asli data) bhej diya hai */}
      <DashboardClient claims={formattedClaims} />
    </div>
  );
}
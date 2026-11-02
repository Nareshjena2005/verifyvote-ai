import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Claim from "@/models/Claim";
import { analyzeClaimWithAI } from "@/lib/gemini"; // <-- AI import

export async function POST(request) {
  try {
    const body = await request.json();
    await connectToDatabase();

    const finalClaimText = body.claimText || body.submittedUrl;
    const summary = finalClaimText.length > 70 
      ? finalClaimText.substring(0, 70) + "..." 
      : finalClaimText;

    // 1. AI se analysis karwao
    const aiResult = await analyzeClaimWithAI(finalClaimText); // <-- AI call

    // 2. Database mein save karo
    const newClaim = await Claim.create({
      type: body.type,
      claimText: finalClaimText,
      submittedUrl: body.submittedUrl || null,
      summary: summary,
      aiAssessment: aiResult.assessment, // <-- AI ka status
      aiExplanation: aiResult.explanation, // <-- AI ki reasoning
    });

    return NextResponse.json({ success: true, data: newClaim }, { status: 201 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const claims = await Claim.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: claims }, { status: 200 });
  } catch (error) {
    console.error("Error fetching claims:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch claims" }, { status: 500 });
  }
}
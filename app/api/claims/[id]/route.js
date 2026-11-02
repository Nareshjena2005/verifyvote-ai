import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Claim from "@/models/Claim";

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    await connectToDatabase();
    
    // Database mein status update karo
    const updatedClaim = await Claim.findByIdAndUpdate(
      id,
      { humanStatus: body.status },
      { new: true }
    );

    if (!updatedClaim) {
      return NextResponse.json({ success: false, error: "Claim not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedClaim }, { status: 200 });
  } catch (error) {
    console.error("Error updating claim:", error);
    return NextResponse.json({ success: false, error: "Failed to update" }, { status: 500 });
  }
}
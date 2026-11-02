import mongoose from "mongoose";

const ClaimSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["text", "url", "image"], required: true },
    claimText: { type: String, required: true },
    submittedUrl: { type: String },
    summary: { type: String }, 
    aiAssessment: { type: String, default: "pending" },
    aiExplanation: { type: String, default: "" }, // <--- YE LINE ADD KARO
    humanStatus: { type: String, default: "pending" }
  },
  { timestamps: true }
);

export default mongoose.models.Claim || mongoose.model("Claim", ClaimSchema);
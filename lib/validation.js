import { z } from "zod";

// Shared between client forms now and API route handlers in Stage 2,
// so the same rules apply on both sides.

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5 MB
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const textClaimSchema = z.object({
  claimText: z
    .string()
    .trim()
    .min(15, "Describe the claim in at least 15 characters.")
    .max(2000, "Keep the claim under 2,000 characters."),
});

export const urlClaimSchema = z.object({
  submittedUrl: z
    .string()
    .trim()
    .url("Enter a full link, including https://")
    .refine((v) => /^https?:\/\//i.test(v), "Only http and https links are accepted.")
    .max(2048, "That link is too long."),
});

// Returns an error message, or null when the file is acceptable.
export function validateImageFile(file) {
  if (!file) return "Choose an image to upload.";
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) return "Use a JPEG, PNG, or WebP image.";
  if (file.size > MAX_IMAGE_BYTES) return "The image must be 5 MB or smaller.";
  return null;
}

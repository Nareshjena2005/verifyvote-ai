"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { textClaimSchema } from "@/lib/validation";

// Hero input. Validates, then hands the text to the full submit page.
export default function QuickCheck() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(textClaimSchema), defaultValues: { claimText: "" } });

  return (
    <form
      onSubmit={handleSubmit((v) => router.push(`/submit?claim=${encodeURIComponent(v.claimText)}`))}
      className="w-full max-w-2xl"
      noValidate
    >
      <label htmlFor="quick-claim" className="mb-2 block text-sm font-medium text-slate-200">
        Paste a claim you saw
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="quick-claim"
          type="text"
          placeholder="e.g. Polling stations close at midnight everywhere"
          aria-invalid={!!errors.claimText}
          aria-describedby={errors.claimText ? "quick-claim-error" : undefined}
          className="input flex-1 !py-3"
          {...register("claimText")}
        />
        <button type="submit" className="btn btn-primary !py-3">
          <Search size={16} aria-hidden /> Check claim
        </button>
      </div>
      {errors.claimText && (
        <p id="quick-claim-error" role="alert" className="mt-2 text-sm text-red-300">
          {errors.claimText.message}
        </p>
      )}
    </form>
  );
}

import { Info } from "lucide-react";
import { DEMO_NOTICE } from "@/lib/demoData";

export default function DemoBanner() {
  return (
    <div role="note" className="flex items-start gap-2 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-900 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-200">
      <Info size={16} className="mt-0.5 shrink-0" aria-hidden />
      <p>{DEMO_NOTICE}</p>
    </div>
  );
}

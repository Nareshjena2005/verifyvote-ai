import Link from "next/link";
import { FileText, Image as ImageIcon, Link2 } from "lucide-react";
import StatusBadge from "./StatusBadge";

const TYPE_ICON = { text: FileText, url: Link2, image: ImageIcon };
const TYPE_LABEL = { text: "Text claim", url: "News link", image: "Image" };

export default function ReportCard({ claim }) {
  const Icon = TYPE_ICON[claim.type] ?? FileText;
  return (
    <article className="panel flex flex-col gap-3 p-5">
      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <Icon size={14} aria-hidden />
        <span>{TYPE_LABEL[claim.type]}</span>
        <span aria-hidden>·</span>
        <time dateTime={claim.submittedAt}>{claim.submittedAt}</time>
        <span className="ml-auto rounded bg-amber-100 px-1.5 py-0.5 font-medium text-amber-900 dark:bg-amber-950 dark:text-amber-200">Sample</span>
      </div>
      <h3 className="font-serif text-lg font-semibold leading-snug text-navy-900 dark:text-white">
        <Link href={`/results/${claim.id}`} className="hover:underline focus-visible:outline-2 focus-visible:outline-teal-500">
          {claim.summary}
        </Link>
      </h3>
      <div className="mt-auto flex flex-wrap gap-2">
        <StatusBadge kind="ai" value={claim.aiAssessment} />
        <StatusBadge value={claim.humanStatus} />
      </div>
    </article>
  );
}

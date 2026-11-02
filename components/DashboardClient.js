"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { HUMAN_STATUSES } from "@/lib/statusMeta";

const PAGE_SIZE = 3;

export default function DashboardClient({ claims }) {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return claims.filter(
      (c) =>
        (status === "all" || c.humanStatus === status) &&
        (!term || c.summary.toLowerCase().includes(term) || c.claimText.toLowerCase().includes(term))
    );
  }, [claims, q, status]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <label htmlFor="search" className="sr-only">Search claims</label>
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden />
          <input id="search" type="search" value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} placeholder="Search claims" className="input !pl-9" />
        </div>
        <div>
          <label htmlFor="status" className="sr-only">Filter by status</label>
          <select id="status" value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }} className="input">
            <option value="all">All statuses</option>
            {Object.entries(HUMAN_STATUSES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
          </select>
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="panel mt-6 p-10 text-center">
          <p className="font-medium text-navy-900 dark:text-white">No claims match these filters</p>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Clear the search or choose &ldquo;All statuses&rdquo;.</p>
          <button type="button" onClick={() => { setQ(""); setStatus("all"); }} className="btn btn-ghost mt-4">Clear filters</button>
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {visible.map((c) => (
            <li key={c.id} className="panel flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <Link href={`/results/${c.id}`} className="font-medium text-navy-900 hover:underline dark:text-white">{c.summary}</Link>
                {/* Yahan se sample record hata diya gaya hai */}
                <p className="mt-0.5 text-xs text-slate-500">Submitted {c.submittedAt}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <StatusBadge kind="ai" value={c.aiAssessment} />
                <StatusBadge value={c.humanStatus} />
              </div>
            </li>
          ))}
        </ul>
      )}

      <nav aria-label="Pagination" className="mt-6 flex items-center justify-between text-sm">
        <span className="text-slate-600 dark:text-slate-400">Page {current} of {pages}, {filtered.length} claims</span>
        <div className="flex gap-2">
          <button type="button" className="btn btn-ghost" disabled={current <= 1} onClick={() => setPage(current - 1)}>Previous</button>
          <button type="button" className="btn btn-ghost" disabled={current >= pages} onClick={() => setPage(current + 1)}>Next</button>
        </div>
      </nav>
    </div>
  );
}
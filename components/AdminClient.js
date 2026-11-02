"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { HUMAN_STATUSES, REVIEW_DECISIONS } from "@/lib/statusMeta";

const REL = { supports: "Supports", contradicts: "Contradicts", context: "Context" };

export default function AdminClient({ initialClaims }) {
  const [claims, setClaims] = useState(initialClaims);
  const [selectedId, setSelectedId] = useState(
    initialClaims.find((c) => c.humanStatus === "pending")?.id ?? initialClaims[0]?.id
  );
  const [decision, setDecision] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState("");

  const selected = claims.find((c) => c.id === selectedId);
  const count = (s) => claims.filter((c) => c.humanStatus === s).length;
  const total = claims.length;
  const reviewed = total - count("pending");

  // Agar database mein koi claim nahi hai
  if (!selected) {
    return (
      <div className="panel p-10 text-center">
        <p className="text-slate-600 dark:text-slate-400">No claims in the review queue yet.</p>
        <Link href="/submit" className="btn btn-primary mt-4">Submit a claim</Link>
      </div>
    );
  }

  function select(id) {
    setSelectedId(id);
    setDecision("");
    setNotes("");
    setError("");
    setSaved("");
  }

  async function save(e) {
    e.preventDefault();
    if (!decision) return setError("Choose a decision.");
    if (notes.trim().length < 10) return setError("Add reviewer notes (at least 10 characters) explaining the decision.");
    
    setError("");
    setSaved("");

    try {
      // API call to update in DB
      const res = await fetch(`/api/claims/${selected.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: decision }),
      });

      if (!res.ok) throw new Error("Failed to update DB");

      const entry = {
        at: new Date().toISOString().slice(0, 16).replace("T", " "),
        actor: "Demo reviewer",
        from: HUMAN_STATUSES[selected.humanStatus].label,
        to: HUMAN_STATUSES[decision].label,
        note: notes.trim(),
      };
      
      setClaims((all) => all.map((c) => (c.id === selected.id ? { ...c, humanStatus: decision, history: [entry, ...c.history] } : c)));
      setSaved(`Saved to database as "${HUMAN_STATUSES[decision].label}".`);
      setDecision("");
      setNotes("");
    } catch (err) {
      setError("Database update failed. Check console.");
    }
  }

  const stats = [
    { label: "Total", value: total },
    { label: "Awaiting review", value: count("pending") },
    { label: "Reviewed", value: reviewed },
  ];

  return (
    <div className="space-y-8">
      <section aria-label="Summary statistics" className="grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="panel p-4">
            <p className="text-sm text-slate-500">{s.label}</p>
            <p className="mt-1 font-serif text-3xl font-semibold text-navy-900 dark:text-white">{s.value}</p>
          </div>
        ))}
      </section>

      <section aria-label="Decisions breakdown" className="panel p-5">
        <h2 className="font-semibold text-navy-900 dark:text-white">Decisions</h2>
        <ul className="mt-3 space-y-2">
          {Object.entries(HUMAN_STATUSES).map(([key, meta]) => (
            <li key={key} className="flex items-center gap-3 text-sm">
              <span className="w-40 shrink-0">{meta.label}</span>
              <div className="h-2 flex-1 rounded-full bg-slate-100 dark:bg-navy-800" aria-hidden>
                <div className="h-2 rounded-full bg-teal-600" style={{ width: `${total ? (count(key) / total) * 100 : 0}%` }} />
              </div>
              <span className="w-6 text-right tabular-nums">{count(key)}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <section aria-label="Claim queue">
          <h2 className="mb-3 font-semibold text-navy-900 dark:text-white">Queue</h2>
          <ul className="space-y-2">
            {claims.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => select(c.id)}
                  aria-current={c.id === selectedId}
                  className={`panel w-full p-3 text-left focus-visible:outline-2 focus-visible:outline-teal-500 ${c.id === selectedId ? "!border-teal-600" : ""}`}
                >
                  <span className="line-clamp-2 text-sm font-medium text-navy-900 dark:text-white">{c.summary}</span>
                  <span className="mt-2 block"><StatusBadge value={c.humanStatus} /></span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section aria-label="Review" className="panel space-y-6 p-5 sm:p-6">
          <div>
            <h2 className="font-serif text-xl font-semibold text-navy-900 dark:text-white">{selected.summary}</h2>
            <p className="mt-2 break-words text-sm text-slate-700 dark:text-slate-300">{selected.claimText}</p>
            <Link href={`/results/${selected.id}`} className="mt-2 inline-block text-sm font-medium text-teal-700 hover:underline dark:text-teal-300">Open full report</Link>
          </div>

          <div>
            <h3 className="text-sm font-semibold">AI assessment (preliminary, confidence {selected.confidence})</h3>
            <div className="mt-2"><StatusBadge kind="ai" value={selected.aiAssessment} /></div>
            <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{selected.aiAnalysis.explanation}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Evidence ({selected.evidence.length})</h3>
            {selected.evidence.length === 0 ? (
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">None retrieved. Consider &ldquo;Needs more evidence&rdquo; or &ldquo;Inconclusive&rdquo;.</p>
            ) : (
              <ul className="mt-2 space-y-2 text-sm">
                {selected.evidence.map((e) => (
                  <li key={e.id}>
                    <a href={e.url} target="_blank" rel="noopener noreferrer nofollow" className="font-medium text-teal-700 hover:underline dark:text-teal-300">{e.name}</a>
                    <span className="text-slate-500"> · {REL[e.relationship]}</span>
                    <p className="text-slate-700 dark:text-slate-300">{e.excerpt}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <form onSubmit={save} noValidate className="space-y-4 border-t border-slate-200 pt-5 dark:border-navy-700">
            <fieldset>
              <legend className="text-sm font-semibold">Final decision</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {REVIEW_DECISIONS.map((d) => (
                  <label key={d} className={`cursor-pointer rounded-md border px-3 py-2 text-sm has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-teal-500 ${decision === d ? "border-teal-600 bg-teal-50 text-teal-900 dark:bg-teal-950 dark:text-teal-100" : "border-slate-300 dark:border-navy-700"}`}>
                    <input type="radio" name="decision" value={d} checked={decision === d} onChange={() => setDecision(d)} className="sr-only" />
                    {HUMAN_STATUSES[d].label}
                  </label>
                ))}
              </div>
            </fieldset>
            <div>
              <label htmlFor="notes" className="mb-1.5 block text-sm font-semibold">Reviewer notes</label>
              <textarea id="notes" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} className="input" placeholder="Explain the decision and cite the sources you relied on." />
            </div>
            {error && <p role="alert" className="field-error">{error}</p>}
            {saved && (
              <p role="status" className="flex items-center gap-2 text-sm text-teal-800 dark:text-teal-300">
                <CheckCircle2 size={16} aria-hidden /> {saved}
              </p>
            )}
            <button type="submit" className="btn btn-navy">Record decision</button>
          </form>

          <div>
            <h3 className="text-sm font-semibold">Status history</h3>
            <ol className="mt-2 space-y-2 text-sm">
              {selected.history.map((h, i) => (
                <li key={i}>
                  <span className="text-slate-500">{h.at}, {h.actor}</span>
                  <p>{h.from} to <strong>{h.to}</strong>. {h.note}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>
    </div>
  );
}
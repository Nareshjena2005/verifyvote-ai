"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, FileText, Image as ImageIcon, Link2, Lock, UploadCloud } from "lucide-react";
import { textClaimSchema, urlClaimSchema, validateImageFile } from "@/lib/validation";

const TABS = [
  { id: "text", label: "Text claim", icon: FileText },
  { id: "url", label: "News URL", icon: Link2 },
  { id: "image", label: "Image upload", icon: ImageIcon },
];

// Updated Notice to show successful DB save
function Notice({ onDismiss }) {
  return (
    <div role="status" className="flex items-start gap-3 rounded-md border border-teal-300 bg-teal-50 p-4 text-sm text-teal-900 dark:border-teal-700 dark:bg-teal-950 dark:text-teal-100">
      <CheckCircle2 size={18} className="mt-0.5 shrink-0" aria-hidden />
      <div>
        <p className="font-medium">Claim submitted successfully!</p>
        <p className="mt-1">
          Your claim has been saved to the database and is pending review.
        </p>
        <button type="button" onClick={onDismiss} className="mt-2 font-medium underline">Dismiss</button>
      </div>
    </div>
  );
}

function TextTab({ initial }) {
  const [ok, setOk] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
    resolver: zodResolver(textClaimSchema),
    defaultValues: { claimText: initial },
  });
  const count = watch("claimText")?.length ?? 0;

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/claims", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "text", claimText: data.claimText }),
      });
      
      if (res.ok) {
        setOk(true);
        reset({ claimText: "" });
      } else {
        setErrorMsg("Database mein save nahi ho paya. Terminal check karo.");
      }
    } catch (err) {
      setErrorMsg("Network error! Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div>
        <label htmlFor="claimText" className="mb-1.5 block text-sm font-medium">The claim</label>
        <textarea
          id="claimText"
          rows={5}
          className="input"
          placeholder="Write the claim as it was shared, in one or two sentences."
          aria-invalid={!!errors.claimText}
          aria-describedby="claimText-help"
          {...register("claimText")}
        />
        <div id="claimText-help" className="mt-1.5 flex justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Quote the claim; do not add your own opinion.</span>
          <span>{count}/2000</span>
        </div>
        {errors.claimText && <p role="alert" className="field-error">{errors.claimText.message}</p>}
      </div>
      
      {ok && <Notice onDismiss={() => setOk(false)} />}
      {errorMsg && <p role="alert" className="text-red-500 text-sm">{errorMsg}</p>}
      
      <div className="flex flex-wrap gap-3">
        <button type="submit" disabled={isSubmitting} className="btn btn-primary">
          {isSubmitting ? "Saving..." : "Submit for verification"}
        </button>
        <button type="button" onClick={() => { reset({ claimText: "" }); setOk(false); }} className="btn btn-ghost">
          Clear
        </button>
      </div>
    </form>
  );
}

function UrlTab() {
  const [ok, setOk] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(urlClaimSchema),
    defaultValues: { submittedUrl: "" },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/claims", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "url", submittedUrl: data.submittedUrl }),
      });
      
      if (res.ok) {
        setOk(true);
        reset({ submittedUrl: "" });
      } else {
        setErrorMsg("Database mein save nahi ho paya.");
      }
    } catch (err) {
      setErrorMsg("Network error! Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div>
        <label htmlFor="submittedUrl" className="mb-1.5 block text-sm font-medium">Link to the article</label>
        <input
          id="submittedUrl"
          type="url"
          inputMode="url"
          className="input"
          placeholder="https://example.com/news/article"
          aria-invalid={!!errors.submittedUrl}
          aria-describedby="url-help"
          {...register("submittedUrl")}
        />
        <p id="url-help" className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
          Public pages only. We read the title, publisher, date, and description when the page allows it.
        </p>
        {errors.submittedUrl && <p role="alert" className="field-error">{errors.submittedUrl.message}</p>}
      </div>
      
      {ok && <Notice onDismiss={() => setOk(false)} />}
      {errorMsg && <p role="alert" className="text-red-500 text-sm">{errorMsg}</p>}

      <div className="flex flex-wrap gap-3">
        <button type="submit" disabled={isSubmitting} className="btn btn-primary">
          {isSubmitting ? "Saving..." : "Submit for verification"}
        </button>
        <button type="button" onClick={() => { reset({ submittedUrl: "" }); setOk(false); }} className="btn btn-ghost">
          Clear
        </button>
      </div>
    </form>
  );
}

function ImageTab() {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const [ok, setOk] = useState(false);

  useEffect(() => () => preview && URL.revokeObjectURL(preview), [preview]);

  function pick(e) {
    const f = e.target.files?.[0] ?? null;
    setOk(false);
    const problem = f ? validateImageFile(f) : null;
    if (problem) {
      setError(problem);
      setFile(null);
      setPreview(null);
      e.target.value = "";
      return;
    }
    setError(null);
    setFile(f);
    setPreview(f ? URL.createObjectURL(f) : null);
  }

  function clear() {
    setFile(null);
    setPreview(null);
    setError(null);
    setOk(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  function submit(e) {
    e.preventDefault();
    const problem = validateImageFile(file);
    if (problem) return setError(problem);
    setOk(true); 
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <div>
        <label htmlFor="image" className="mb-1.5 block text-sm font-medium">Image</label>
        <label
          htmlFor="image"
          className="flex cursor-pointer flex-col items-center gap-2 rounded-md border-2 border-dashed border-slate-300 px-4 py-8 text-center text-sm text-slate-600 focus-within:outline-2 focus-within:outline-teal-500 hover:bg-slate-50 dark:border-navy-700 dark:text-slate-300 dark:hover:bg-navy-800"
        >
          <UploadCloud size={24} aria-hidden />
          <span>{file ? file.name : "Choose a JPEG, PNG, or WebP image (up to 5 MB)"}</span>
        </label>
        <input
          ref={inputRef}
          id="image"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={pick}
          className="sr-only"
          aria-describedby="image-error"
        />
        {error && <p id="image-error" role="alert" className="field-error">{error}</p>}
      </div>
      {preview && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={preview} alt="Preview of the selected image" className="max-h-72 rounded-md border border-slate-200 object-contain dark:border-navy-700" />
      )}
      {ok && <Notice onDismiss={() => setOk(false)} />}
      <div className="flex flex-wrap gap-3">
        <button type="submit" className="btn btn-primary">Submit for verification</button>
        <button type="button" onClick={clear} className="btn btn-ghost">Clear</button>
      </div>
    </form>
  );
}

export default function ClaimForm({ initialClaim = "" }) {
  const [tab, setTab] = useState("text");

  return (
    <div className="panel p-5 sm:p-7">
      <div role="tablist" aria-label="Claim type" className="mb-6 flex flex-wrap gap-1 border-b border-slate-200 dark:border-navy-700">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            role="tab"
            id={`tab-${id}`}
            aria-selected={tab === id}
            aria-controls={`panel-${id}`}
            tabIndex={tab === id ? 0 : -1}
            onClick={() => setTab(id)}
            onKeyDown={(e) => {
              const i = TABS.findIndex((t) => t.id === tab);
              if (e.key === "ArrowRight") setTab(TABS[(i + 1) % TABS.length].id);
              if (e.key === "ArrowLeft") setTab(TABS[(i - 1 + TABS.length) % TABS.length].id);
            }}
            className={`-mb-px inline-flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium focus-visible:outline-2 focus-visible:outline-teal-500 ${
              tab === id
                ? "border-teal-600 text-teal-700 dark:text-teal-300"
                : "border-transparent text-slate-600 hover:text-navy-900 dark:text-slate-400 dark:hover:text-white"
            }`}
          >
            <Icon size={16} aria-hidden /> {label}
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
        {tab === "text" && <TextTab initial={initialClaim} />}
        {tab === "url" && <UrlTab />}
        {tab === "image" && <ImageTab />}
      </div>

      <div className="mt-6 flex items-start gap-2 border-t border-slate-200 pt-4 text-xs text-slate-500 dark:border-navy-700 dark:text-slate-400">
        <Lock size={14} className="mt-0.5 shrink-0" aria-hidden />
        <p>
          Privacy: submissions are private to you and reviewers. Public reports never show who submitted a claim.
          Disclaimer: results are preliminary AI assessments plus existing fact-checks, not legal or official advice.
        </p>
      </div>
    </div>
  );
}
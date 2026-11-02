import Skeleton from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="page-wrap max-w-4xl space-y-4 py-12" role="status" aria-label="Loading report">
      <Skeleton className="h-8 w-2/3" />
      <Skeleton className="h-5 w-1/3" />
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-40 w-full" />
    </div>
  );
}

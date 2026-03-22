"use client";

export default function AnalysisSkeleton() {
  return (
    <div
      className="rounded-2xl bg-bg-card border border-white/5 p-8 space-y-6"
      role="status"
      aria-label="Loading analysis"
    >
      {/* Header skeleton */}
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-2 rounded-full bg-cyan-400/30 animate-pulse" />
        <div className="h-3 w-32 rounded-full skeleton-shimmer" />
      </div>

      {/* Line group 1 */}
      <div className="space-y-3" style={{ animationDelay: "0ms" }}>
        <div className="h-4 w-3/4 rounded-md skeleton-shimmer" />
        <div className="h-4 w-full rounded-md skeleton-shimmer" style={{ animationDelay: "75ms" }} />
        <div className="h-4 w-5/6 rounded-md skeleton-shimmer" style={{ animationDelay: "150ms" }} />
      </div>

      {/* Line group 2 */}
      <div className="space-y-3" style={{ animationDelay: "200ms" }}>
        <div className="h-4 w-2/3 rounded-md skeleton-shimmer" style={{ animationDelay: "225ms" }} />
        <div className="h-4 w-full rounded-md skeleton-shimmer" style={{ animationDelay: "300ms" }} />
        <div className="h-4 w-4/5 rounded-md skeleton-shimmer" style={{ animationDelay: "375ms" }} />
      </div>

      {/* Line group 3 */}
      <div className="space-y-3" style={{ animationDelay: "400ms" }}>
        <div className="h-4 w-1/2 rounded-md skeleton-shimmer" style={{ animationDelay: "450ms" }} />
        <div className="h-4 w-5/6 rounded-md skeleton-shimmer" style={{ animationDelay: "525ms" }} />
        <div className="h-4 w-3/4 rounded-md skeleton-shimmer" style={{ animationDelay: "600ms" }} />
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  );
}

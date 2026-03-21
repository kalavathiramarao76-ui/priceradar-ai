"use client";

interface ApiErrorFallbackProps {
  error: string;
  onRetry?: () => void;
}

export default function ApiErrorFallback({ error, onRetry }: ApiErrorFallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-[200px]">
      <div
        className="max-w-sm w-full rounded-2xl p-6 text-center"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-color)",
        }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}
        >
          <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" />
          </svg>
        </div>
        <h3 className="text-sm font-semibold mb-1.5" style={{ color: "var(--text-primary)" }}>
          Request Failed
        </h3>
        <p className="text-xs mb-4 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          {error}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 font-medium text-xs transition-all"
            style={{ color: "var(--bg-primary)" }}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
            </svg>
            Retry
          </button>
        )}
      </div>
    </div>
  );
}

"use client";

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = ((current + 1) / total) * 100;

  return (
    <div className="w-full mb-10">
      <div className="flex justify-between text-xs text-brand-muted mb-2.5 uppercase tracking-wider">
        <span>Question {current + 1} of {total}</span>
        <span>{Math.round(pct)}%</span>
      </div>
      <div className="w-full h-0.5 bg-brand-border rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${pct}%`,
            background: "linear-gradient(90deg, #c8a97e, #d4b98e)",
          }}
        />
      </div>
    </div>
  );
}

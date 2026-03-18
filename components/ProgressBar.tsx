"use client";

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = ((current + 1) / total) * 100;
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between text-sm text-brand-muted mb-2">
        <span>Question {current + 1} of {total}</span>
        <span>{Math.round(pct)}%</span>
      </div>
      <div className="w-full h-1 bg-brand-border rounded-full overflow-hidden">
        <div
          className="h-full bg-brand-accent rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

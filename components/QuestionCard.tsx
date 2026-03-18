"use client";

import { useState } from "react";
import type { Question } from "@/lib/questions";
import { LiquidMetalButton } from "./LiquidMetalButton";

interface QuestionCardProps {
  question: Question;
  onAnswer: (value: string) => void;
  visible: boolean;
}

export function QuestionCard({ question, onAnswer, visible }: QuestionCardProps) {
  const [otherText, setOtherText] = useState("");
  const [textValue, setTextValue] = useState("");
  const [showOther, setShowOther] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  if (question.type === "text") {
    return (
      <div
        className={`transition-all duration-500 ease-out ${
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none absolute inset-x-0"
        }`}
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-3 leading-tight text-white">
          {question.title}
        </h2>
        {question.subtitle && (
          <p className="text-brand-muted mb-6 text-sm">{question.subtitle}</p>
        )}
        <textarea
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          placeholder={question.placeholder}
          rows={4}
          className="w-full bg-brand-card border border-brand-border rounded-2xl p-4 text-white placeholder:text-brand-muted focus:outline-none focus:border-brand-accent/50 resize-none transition-colors"
        />
        <div className="mt-5">
          <LiquidMetalButton
            label="Continue"
            onClick={() => textValue.trim() && onAnswer(textValue.trim())}
            disabled={!textValue.trim()}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`transition-all duration-500 ease-out ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none absolute inset-x-0"
      }`}
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-6 leading-tight text-white">
        {question.title}
      </h2>
      <div className="space-y-2.5">
        {question.options?.map((opt) => (
          <button
            key={opt.value}
            onClick={() => {
              setSelectedValue(opt.value);
              setTimeout(() => onAnswer(opt.value), 200);
            }}
            className={`w-full text-left px-5 py-4 rounded-2xl border transition-all duration-200 ${
              selectedValue === opt.value
                ? "border-brand-accent bg-brand-accent/10 text-white"
                : "border-brand-border bg-brand-card hover:border-brand-border-hover hover:bg-brand-card-hover text-brand-text"
            }`}
          >
            {opt.label}
          </button>
        ))}
        {question.allowOther && !showOther && (
          <button
            onClick={() => setShowOther(true)}
            className="w-full text-left px-5 py-4 rounded-2xl border border-brand-border bg-brand-card hover:border-brand-border-hover hover:bg-brand-card-hover transition-all duration-200 text-brand-muted"
          >
            Other...
          </button>
        )}
        {showOther && (
          <div className="flex gap-2">
            <input
              autoFocus
              value={otherText}
              onChange={(e) => setOtherText(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" &&
                otherText.trim() &&
                onAnswer(`other: ${otherText.trim()}`)
              }
              placeholder="Type your answer..."
              className="flex-1 bg-brand-card border border-brand-accent/50 rounded-2xl px-4 py-3 text-white placeholder:text-brand-muted focus:outline-none focus:border-brand-accent transition-colors"
            />
            <button
              onClick={() =>
                otherText.trim() && onAnswer(`other: ${otherText.trim()}`)
              }
              disabled={!otherText.trim()}
              className="px-5 py-3 rounded-2xl bg-brand-accent text-brand-bg font-semibold hover:bg-brand-accent-hover disabled:opacity-40 transition-colors"
            >
              OK
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

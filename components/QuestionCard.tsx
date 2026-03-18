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
        <h2 className="text-2xl md:text-3xl font-bold mb-3 leading-tight text-brand-navy">
          {question.title}
        </h2>
        {question.subtitle && (
          <p className="text-brand-subtext mb-6 text-sm">{question.subtitle}</p>
        )}
        <textarea
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          placeholder={question.placeholder}
          rows={4}
          className="w-full bg-white border border-brand-border rounded-2xl p-4 text-brand-navy placeholder:text-brand-muted focus:outline-none focus:border-brand-navy focus:ring-1 focus:ring-brand-navy/20 resize-none transition-all"
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
      <h2 className="text-2xl md:text-3xl font-bold mb-6 leading-tight text-brand-navy">
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
                ? "border-brand-navy bg-brand-navy text-white"
                : "border-brand-border bg-white hover:border-brand-navy hover:bg-brand-bg-secondary text-brand-navy"
            }`}
          >
            {opt.label}
          </button>
        ))}
        {question.allowOther && !showOther && (
          <button
            onClick={() => setShowOther(true)}
            className="w-full text-left px-5 py-4 rounded-2xl border border-brand-border bg-white hover:border-brand-navy hover:bg-brand-bg-secondary transition-all duration-200 text-brand-subtext"
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
              className="flex-1 bg-white border border-brand-navy rounded-2xl px-4 py-3 text-brand-navy placeholder:text-brand-muted focus:outline-none focus:ring-1 focus:ring-brand-navy/20 transition-all"
            />
            <button
              onClick={() =>
                otherText.trim() && onAnswer(`other: ${otherText.trim()}`)
              }
              disabled={!otherText.trim()}
              className="px-5 py-3 rounded-2xl bg-brand-navy text-white font-semibold hover:bg-brand-navy-hover disabled:opacity-40 transition-colors"
            >
              OK
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import type { Question } from "@/lib/questions";

interface QuestionCardProps {
  question: Question;
  onAnswer: (value: string) => void;
  visible: boolean;
}

export function QuestionCard({ question, onAnswer, visible }: QuestionCardProps) {
  const [otherText, setOtherText] = useState("");
  const [textValue, setTextValue] = useState("");
  const [showOther, setShowOther] = useState(false);

  if (question.type === "text") {
    return (
      <div className={`transition-all duration-400 ease-out ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-5 pointer-events-none absolute"}`}>
        <h2 className="text-2xl md:text-3xl font-bold mb-3 leading-tight">{question.title}</h2>
        {question.subtitle && <p className="text-brand-muted mb-6">{question.subtitle}</p>}
        <textarea
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          placeholder={question.placeholder}
          rows={4}
          className="w-full bg-brand-card border border-brand-border rounded-xl p-4 text-white placeholder:text-brand-muted focus:outline-none focus:border-brand-accent resize-none"
        />
        <button
          onClick={() => textValue.trim() && onAnswer(textValue.trim())}
          disabled={!textValue.trim()}
          className="mt-4 w-full py-3 rounded-xl font-semibold transition-colors bg-brand-accent text-brand-bg hover:bg-brand-accent-hover disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    );
  }

  return (
    <div className={`transition-all duration-400 ease-out ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-5 pointer-events-none absolute"}`}>
      <h2 className="text-2xl md:text-3xl font-bold mb-6 leading-tight">{question.title}</h2>
      <div className="space-y-3">
        {question.options?.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onAnswer(opt.value)}
            className="w-full text-left px-5 py-4 rounded-xl border border-brand-border bg-brand-card hover:border-brand-accent hover:bg-brand-card/80 transition-all"
          >
            {opt.label}
          </button>
        ))}
        {question.allowOther && !showOther && (
          <button
            onClick={() => setShowOther(true)}
            className="w-full text-left px-5 py-4 rounded-xl border border-brand-border bg-brand-card hover:border-brand-accent transition-all text-brand-muted"
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
              onKeyDown={(e) => e.key === "Enter" && otherText.trim() && onAnswer(`other: ${otherText.trim()}`)}
              placeholder="Type your answer..."
              className="flex-1 bg-brand-card border border-brand-accent rounded-xl px-4 py-3 text-white placeholder:text-brand-muted focus:outline-none"
            />
            <button
              onClick={() => otherText.trim() && onAnswer(`other: ${otherText.trim()}`)}
              disabled={!otherText.trim()}
              className="px-5 py-3 rounded-xl bg-brand-accent text-brand-bg font-semibold hover:bg-brand-accent-hover disabled:opacity-40"
            >
              OK
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

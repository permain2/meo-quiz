"use client";

import { useState, useRef, useEffect } from "react";
import type { Question } from "@/lib/questions";
import { LiquidMetalButton } from "./LiquidMetalButton";

interface QuestionCardProps {
  question: Question;
  onAnswer: (value: string) => void;
  visible: boolean;
}

export function QuestionCard({ question, onAnswer, visible }: QuestionCardProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-focus textarea when question becomes visible
  useEffect(() => {
    if (visible && textareaRef.current) {
      const timer = setTimeout(() => textareaRef.current?.focus(), 400);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.max(120, textareaRef.current.scrollHeight)}px`;
    }
  }, [value]);

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (trimmed) {
      onAnswer(trimmed);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div
      className={`transition-all duration-500 ease-out ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none absolute inset-x-0"
      }`}
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-2 leading-tight text-brand-navy">
        {question.title}
      </h2>
      <p className="text-brand-subtext text-sm mb-6">
        {question.subtitle}
      </p>

      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={question.placeholder}
        className="w-full bg-white border border-brand-border rounded-2xl px-5 py-4 text-brand-navy text-base leading-relaxed placeholder:text-brand-muted/60 focus:outline-none focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/10 resize-none transition-all"
        style={{ minHeight: "120px" }}
      />

      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="text-xs text-brand-muted hidden sm:block">
          {value.trim() ? "\u2318/Ctrl + Enter to submit" : ""}
        </span>
        <div className={value.trim() ? "w-full sm:w-auto sm:min-w-[180px]" : "w-full"}>
          <LiquidMetalButton
            label="Continue"
            onClick={handleSubmit}
            disabled={!value.trim()}
          />
        </div>
      </div>
    </div>
  );
}

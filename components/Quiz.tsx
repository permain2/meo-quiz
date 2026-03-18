"use client";

import { useState, useCallback } from "react";
import { questions } from "@/lib/questions";
import { identifyProfile, trackEvent } from "@/lib/klaviyo";
import { ProgressBar } from "./ProgressBar";
import { QuestionCard } from "./QuestionCard";
import { ThankYou } from "./ThankYou";

interface QuizProps {
  email: string | null;
  discountCode: string;
  storeUrl: string;
}

export function Quiz({ email, discountCode, storeUrl }: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [completed, setCompleted] = useState(false);

  const handleAnswer = useCallback(
    async (value: string) => {
      const question = questions[currentIndex];
      const newAnswers = { ...answers, [question.klaviyoProperty]: value };
      setAnswers(newAnswers);

      if (email) {
        identifyProfile({
          email,
          properties: { [question.klaviyoProperty]: value },
        });
      }

      if (currentIndex < questions.length - 1) {
        setCurrentIndex((i) => i + 1);
      } else {
        setCompleted(true);
        if (email) {
          const completionProps: Record<string, string | boolean> = {
            ...newAnswers,
            quiz_completed: true,
            quiz_completed_at: new Date().toISOString(),
          };
          identifyProfile({ email, properties: completionProps });
          trackEvent(email, "Quiz Completed", completionProps);
        }
      }
    },
    [currentIndex, answers, email]
  );

  if (!email) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Oops!</h2>
        <p className="text-brand-muted">
          This quiz is meant to be accessed from your email.<br />
          Check your inbox for the link from Meo Nutrition.
        </p>
      </div>
    );
  }

  if (completed) {
    return <ThankYou discountCode={discountCode} storeUrl={storeUrl} />;
  }

  return (
    <div>
      <ProgressBar current={currentIndex} total={questions.length} />
      <div className="relative">
        {questions.map((q, i) => (
          <QuestionCard key={q.id} question={q} onAnswer={handleAnswer} visible={i === currentIndex} />
        ))}
      </div>
    </div>
  );
}

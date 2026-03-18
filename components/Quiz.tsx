"use client";

import { useState, useCallback } from "react";
import { questions } from "@/lib/questions";
import { classifyArchetype } from "@/lib/archetypes";
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
  const [encouragement, setEncouragement] = useState<string | null>(null);

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
        // Show encouragement micro-copy before transitioning
        const msg = question.encouragement;
        if (msg) {
          setEncouragement(msg);
          setTimeout(() => {
            setEncouragement(null);
            setCurrentIndex((i) => i + 1);
          }, 1200);
        } else {
          setCurrentIndex((i) => i + 1);
        }
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
        <h2 className="text-2xl font-bold mb-4 text-brand-navy">Oops!</h2>
        <p className="text-brand-subtext">
          This quiz is meant to be accessed from your email.<br />
          Check your inbox for the link from Meo Nutrition.
        </p>
      </div>
    );
  }

  if (completed) {
    const archetype = classifyArchetype(answers.quiz_identity || "");
    return <ThankYou discountCode={discountCode} storeUrl={storeUrl} archetype={archetype} />;
  }

  return (
    <div>
      <ProgressBar current={currentIndex} total={questions.length} />

      {/* Encouragement micro-copy between questions */}
      {encouragement && (
        <div className="flex items-center justify-center py-12 animate-fade-in">
          <p className="text-brand-navy/70 text-lg font-medium italic">
            {encouragement}
          </p>
        </div>
      )}

      {!encouragement && (
        <div className="relative">
          {questions.map((q, i) => (
            <QuestionCard key={q.id} question={q} onAnswer={handleAnswer} visible={i === currentIndex} />
          ))}
        </div>
      )}
    </div>
  );
}

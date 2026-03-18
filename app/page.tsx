"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Quiz } from "@/components/Quiz";

function QuizPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  return (
    <Quiz
      email={email}
      discountCode={process.env.NEXT_PUBLIC_DISCOUNT_CODE ?? "THANKYOU15"}
      storeUrl={process.env.NEXT_PUBLIC_STORE_URL ?? "https://meonutrition.com"}
    />
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-brand-muted py-20">Loading...</div>}>
      <QuizPage />
    </Suspense>
  );
}

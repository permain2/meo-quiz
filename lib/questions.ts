export type QuestionType = "single" | "text";

export interface QuestionOption {
  label: string;
  value: string;
}

export interface Question {
  id: string;
  klaviyoProperty: string;
  title: string;
  subtitle?: string;
  type: QuestionType;
  options?: QuestionOption[];
  placeholder?: string;
  allowOther?: boolean;
}

export const questions: Question[] = [
  {
    id: "trigger",
    klaviyoProperty: "quiz_trigger",
    title: "What first made you try supplements like beetroot or berberine?",
    type: "single",
    allowOther: true,
    options: [
      { label: "Weight management", value: "weight_management" },
      { label: "More energy", value: "energy" },
      { label: "Blood sugar support", value: "blood_sugar" },
      { label: "Blood pressure / heart health", value: "heart_health" },
      { label: "Athletic performance", value: "athletic_performance" },
      { label: "Doctor recommended", value: "doctor_recommended" },
      { label: "Saw on social media", value: "social_media" },
    ],
  },
  {
    id: "previous",
    klaviyoProperty: "quiz_previous",
    title: "What did you try before finding Meo Nutrition?",
    type: "single",
    allowOther: true,
    options: [
      { label: "Other supplement brands", value: "other_supplements" },
      { label: "Prescription medication", value: "prescription" },
      { label: "Diet / lifestyle changes only", value: "diet_lifestyle" },
      { label: "Nothing \u2014 this was my first", value: "nothing_first" },
    ],
  },
  {
    id: "description",
    klaviyoProperty: "quiz_description",
    title: "How would you describe what Meo Nutrition does for you to a friend?",
    subtitle: "In your own words \u2014 there\u2019s no wrong answer.",
    type: "text",
    placeholder: "e.g. It helps me manage my blood sugar naturally...",
  },
  {
    id: "skepticism",
    klaviyoProperty: "quiz_skepticism",
    title: "What were you most skeptical about before buying?",
    type: "single",
    allowOther: true,
    options: [
      { label: "Does it actually work?", value: "efficacy" },
      { label: "Ingredient quality / sourcing", value: "quality" },
      { label: "Price", value: "price" },
      { label: "Potential side effects", value: "side_effects" },
      { label: "Seemed too good to be true", value: "too_good" },
      { label: "I wasn\u2019t skeptical", value: "not_skeptical" },
    ],
  },
  {
    id: "retention",
    klaviyoProperty: "quiz_retention",
    title: "What keeps you coming back?",
    type: "single",
    allowOther: true,
    options: [
      { label: "I feel a real difference", value: "feel_difference" },
      { label: "Quality of ingredients", value: "ingredient_quality" },
      { label: "Good value for price", value: "good_value" },
      { label: "Convenience", value: "convenience" },
      { label: "I trust the brand", value: "trust_brand" },
    ],
  },
];

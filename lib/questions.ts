export interface Question {
  id: string;
  klaviyoProperty: string;
  title: string;
  subtitle: string;
  placeholder: string;
}

export const questions: Question[] = [
  {
    id: "trigger",
    klaviyoProperty: "quiz_trigger",
    title: "What first made you try supplements like beetroot or berberine?",
    subtitle: "What was going on in your life or health that led you here?",
    placeholder: "e.g. My doctor said my blood sugar was too high and I wanted a natural option...",
  },
  {
    id: "previous",
    klaviyoProperty: "quiz_previous",
    title: "What did you try before finding Meo Nutrition?",
    subtitle: "Other products, prescriptions, lifestyle changes \u2014 anything counts.",
    placeholder: "e.g. I tried a few brands from Amazon but never noticed a difference...",
  },
  {
    id: "description",
    klaviyoProperty: "quiz_description",
    title: "How would you describe what Meo Nutrition does for you to a friend?",
    subtitle: "In your own words \u2014 there\u2019s no wrong answer.",
    placeholder: "e.g. It helps me manage my blood sugar naturally without side effects...",
  },
  {
    id: "skepticism",
    klaviyoProperty: "quiz_skepticism",
    title: "What were you most skeptical about before buying?",
    subtitle: "Be honest \u2014 we want to know what almost stopped you.",
    placeholder: "e.g. I wasn\u2019t sure if it would actually work or if it was just marketing...",
  },
  {
    id: "retention",
    klaviyoProperty: "quiz_retention",
    title: "What keeps you coming back to Meo Nutrition?",
    subtitle: "What\u2019s the main reason you reorder?",
    placeholder: "e.g. I genuinely feel more energy and my blood work has improved...",
  },
];

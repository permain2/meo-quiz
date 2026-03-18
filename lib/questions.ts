export interface Question {
  id: string;
  klaviyoProperty: string;
  title: string;
  subtitle: string;
  placeholder: string;
  encouragement?: string;
}

export const questions: Question[] = [
  {
    id: "identity",
    klaviyoProperty: "quiz_identity",
    title: "When it comes to health, what kind of person do you consider yourself?",
    subtitle: "e.g. the researcher, the 'just want to feel normal' person, the preventative thinker, the skeptic who finally tried something",
    placeholder: "e.g. I'm the type who reads every label and researches everything before trying it...",
    encouragement: "Great start — this really helps us understand you.",
  },
  {
    id: "trigger",
    klaviyoProperty: "quiz_trigger",
    title: "What was happening in your life or health that first led you to try supplements like beetroot or berberine?",
    subtitle: "The real story — what worried you, what moment made you take action?",
    placeholder: "e.g. My doctor said I was pre-diabetic and I wanted a natural option before medication...",
    encouragement: "Thank you for sharing that — it means a lot.",
  },
  {
    id: "transformation",
    klaviyoProperty: "quiz_transformation",
    title: "Imagine your health is exactly where you want it 12 months from now. What does a normal day look like?",
    subtitle: "How do you feel when you wake up? At 3pm? In the evening?",
    placeholder: "e.g. I wake up with energy, no afternoon crash, and I feel confident about my blood work...",
    encouragement: "Love that vision — you're halfway through!",
  },
  {
    id: "trust",
    klaviyoProperty: "quiz_trust",
    title: "Who do you trust most for health advice, and where do you actually get your health information?",
    subtitle: "Doctors, podcasters, friends, specific YouTube channels, communities — name names if you can",
    placeholder: "e.g. My doctor, Dr. Berg on YouTube, and a few health groups on Facebook...",
    encouragement: "Great insight — almost there!",
  },
  {
    id: "personality",
    klaviyoProperty: "quiz_personality",
    title: "If Meo Nutrition were a person at a dinner party, who would they be?",
    subtitle: "The quiet expert? The passionate evangelist? The no-BS friend? The warm caretaker?",
    placeholder: "e.g. The knowledgeable friend who gives you straight answers without trying to sell you...",
    encouragement: "Interesting — two more to go!",
  },
  {
    id: "enemy",
    klaviyoProperty: "quiz_enemy",
    title: "What frustrates you most about the supplement industry?",
    subtitle: "Be honest — what bugs you about how supplements are sold and marketed?",
    placeholder: "e.g. Too many brands make wild claims with no real science behind them...",
    encouragement: "We hear you — last question!",
  },
  {
    id: "loyalty",
    klaviyoProperty: "quiz_loyalty",
    title: "Name 2–3 brands you're genuinely loyal to — brands where you wouldn't switch even if something cheaper came along. What makes you loyal?",
    subtitle: "Any brand in any category — what keeps you coming back?",
    placeholder: "e.g. Apple for reliability, Costco for value, Patagonia for quality and values...",
  },
];

export interface Archetype {
  id: string;
  name: string;
  title: string;
  description: string;
  emoji: string;
}

export const archetypes: Archetype[] = [
  {
    id: "researcher",
    name: "The Health Researcher",
    title: "Evidence-First Thinker",
    description:
      "You read every label, dig into the studies, and only trust what the science says. Your body deserves proof, not promises.",
    emoji: "🔬",
  },
  {
    id: "preventative",
    name: "The Preventative Thinker",
    title: "Playing the Long Game",
    description:
      "You act before problems appear. Health isn't something you fix — it's something you protect. That kind of foresight is rare.",
    emoji: "🛡️",
  },
  {
    id: "skeptic",
    name: "The Converted Skeptic",
    title: "Proof Over Promises",
    description:
      "You didn't believe the hype — until the results spoke for themselves. Your standards are high, and that's exactly why you're here.",
    emoji: "⚡",
  },
  {
    id: "seeker",
    name: "The Feel-Normal Seeker",
    title: "Getting Back to You",
    description:
      "You're not chasing peak performance — you just want to feel like yourself again. That honesty is powerful, and we hear you.",
    emoji: "🌿",
  },
  {
    id: "optimizer",
    name: "The Optimizer",
    title: "Always Fine-Tuning",
    description:
      "You treat your body like a system worth perfecting. Every choice is intentional, every supplement has a purpose.",
    emoji: "🎯",
  },
];

const keywordMap: Record<string, string[]> = {
  researcher: [
    "research", "study", "studies", "evidence", "label", "ingredient",
    "data", "science", "clinical", "peer", "journal", "read", "analyze",
    "test", "verify", "prove", "proven", "examined",
  ],
  preventative: [
    "prevent", "proactive", "ahead", "future", "before", "early",
    "long term", "long-term", "invest", "protect", "maintenance",
    "avoid", "precaution", "foresight", "plan",
  ],
  skeptic: [
    "skeptic", "skeptical", "didn't believe", "doubtful", "tried",
    "finally", "surprised", "didn't think", "wasn't sure", "hesitant",
    "reluctant", "convinced", "converted", "last resort",
  ],
  optimizer: [
    "optimi", "hack", "biohack", "stack", "protocol", "performance",
    "edge", "peak", "maximize", "fine-tune", "tweak", "track",
    "measure", "experiment", "nootropic", "supplement stack",
  ],
  seeker: [
    "normal", "energy", "tired", "exhausted", "just want", "feel better",
    "everyday", "basic", "simple", "function", "get through", "survive",
    "fatigue", "sluggish", "fog", "brain fog",
  ],
};

export function classifyArchetype(identityAnswer: string): Archetype {
  const lower = identityAnswer.toLowerCase();
  const scores: Record<string, number> = {};

  for (const [id, keywords] of Object.entries(keywordMap)) {
    scores[id] = 0;
    for (const kw of keywords) {
      if (lower.includes(kw)) {
        scores[id]++;
      }
    }
  }

  const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];

  // Default to "seeker" if no keywords match (most universal)
  const matchId = best[1] > 0 ? best[0] : "seeker";
  return archetypes.find((a) => a.id === matchId) || archetypes[3];
}

import {
  type LearningAudience,
  type LessonPage,
  type SpeciesRecord,
} from "@/types/species";
import { lessonBlueprints } from "@/lib/data/lesson-blueprints";

export const learningAudienceLabels: Record<LearningAudience, string> = {
  elementary: "Elementary (K-5)",
  middle: "Middle School (6-8)",
  high: "High School (9-12)",
  educators: "Educators",
};

export const learningAudienceDescriptions: Record<LearningAudience, string> = {
  elementary: "Shorter, picture-forward lessons built around noticing, habitat, and simple evidence.",
  middle: "Structured walkthroughs that connect evidence, species trends, and recovery decisions.",
  high: "More analytical lessons that ask students to interpret metrics, tradeoffs, and conservation strategy.",
  educators: "Planning support, discussion framing, and lesson-ready materials for classroom use.",
};

export const learningAudiences = Object.keys(
  learningAudienceLabels,
) as LearningAudience[];

function buildFallbackLessonPage(
  species: SpeciesRecord,
  audience: LearningAudience,
): LessonPage {
  const lessonModule = species.learning[audience];

  return {
    audience,
    audienceLabel: learningAudienceLabels[audience],
    title: lessonModule.title,
    focus: lessonModule.focus,
    summary: `${lessonModule.focus}. Students work from Washington-specific evidence and interpret the ${species.populationMetric.label.toLowerCase()}.`,
    essentialQuestion: `What can ${species.commonName} teach us about habitat, evidence, and recovery in Washington?`,
    objectives: lessonModule.bullets,
    materials: ["Species photo", "Observed trend chart", "Washington range map"],
    vocabulary: [species.shortLabel, "habitat", "recovery", "evidence"],
    visualStudy: [
      "Begin with the species image and ask learners what they notice.",
      "Use the chart to explain what the recovery indicator measures.",
      "Use the map to connect the species to Washington places.",
    ],
    walkthrough: [
      {
        title: "1. Notice the species",
        detail: `Open with the photo and quick fact: ${species.quickFact}`,
      },
      {
        title: "2. Build background",
        detail: `Introduce the species through this overview: ${species.heroSummary}`,
      },
      {
        title: "3. Read the evidence",
        detail: `Guide learners through the ${species.populationMetric.label.toLowerCase()} and explain what the latest observed value means.`,
      },
      {
        title: "4. Connect to action",
        detail: `Compare the main threats with the current recovery efforts and ask learners what action matters most.`,
      },
    ],
    discussionPrompts: [
      `What does this dashboard measure well for ${species.commonName}?`,
      "Which threat seems most important right now?",
      "Which recovery action feels most realistic or urgent?",
    ],
    assessment: lessonModule.extension,
    extension: lessonModule.extension,
    visualCaption: `Use the species image, observed chart, and range map together for evidence.`,
  };
}

export function buildLessonPage(
  species: SpeciesRecord,
  audience: LearningAudience,
): LessonPage {
  const lessonModule = species.learning[audience];
  const blueprint = lessonBlueprints[species.slug];
  const audienceBlueprint = blueprint?.audiences[audience];

  if (!blueprint || !audienceBlueprint) {
    return buildFallbackLessonPage(species, audience);
  }

  return {
    audience,
    audienceLabel: learningAudienceLabels[audience],
    title: lessonModule.title,
    focus: lessonModule.focus,
    summary: audienceBlueprint.summary,
    essentialQuestion: audienceBlueprint.essentialQuestion,
    objectives: lessonModule.bullets,
    materials: blueprint.materials,
    vocabulary: blueprint.vocabulary,
    visualStudy: blueprint.visualStudy,
    walkthrough: blueprint.walkthrough,
    discussionPrompts: audienceBlueprint.discussionPrompts,
    assessment: audienceBlueprint.assessment,
    extension: lessonModule.extension,
    visualCaption: blueprint.visualCaption,
  };
}

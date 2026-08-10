export const visionTs = `import { Vision, Goal, Timeline } from "@portfolio/future";

interface FutureVision {
  mission: string;
  impact: string;
}

// Define the long-term direction
const vision: FutureVision = {
  mission: "Build technology that creates meaningful impact.",
  impact: "Empower people through innovative digital solutions.",
  timeline: "2026+"
};

const goals: Goal[] = [
  "Launch CONSULTIFY",
  "Master Cloud Computing",
  "Contribute to Open Source",
  "Design Scalable Systems",
  "Lead Technical Teams"
];

const principles = [
  "Keep Learning",
  "Think Long-Term",
  "Build with Purpose",
  "Share Knowledge"
] as const;

const milestones = {
  shortTerm: "Graduate from ESTIN",
  midTerm: "Launch CONSULTIFY Worldwide",
  longTerm: "Build a Technology Company"
};

const priorities = [
  "Performance",
  "Accessibility",
  "Innovation"
] as const;

// Execute the roadmap
export default Vision(vision)
  .follow(goals)
  .guidedBy(principles)
  .prioritize(priorities)
  .achieve(milestones)
  .evolve();`;

export const aboutProfileIndex = `import { Identity, Workspace, Expertise, Journey, Mission } from "@portfolio/core";

// Initialize developer identity
const developer = Identity({
  name: "Ahmed Yassine Abbane",
  alias: "Jack of All Trades",
  role: ["Full Stack Developer", "Graphic Designer"],
  location: "Tebessa, Algeria",
  status: "Available"
});

// Configure the current workspace
const workspace = Workspace({
  name: "Portfolio Workspace",
  version: "3.0.0",
  architecture: "Component Driven",
  stack: ["React", "TypeScript", "NestJS", "MongoDB", "PostgreSQL", "Figma"]
});

const expertise = Expertise({
  development: ["Frontend", "Backend", "APIs", "Databases"],
  design: ["UI/UX", "Brand Identity", "Graphic Design"],
  mindset: ["Problem Solving", "Scalable Architecture", "Continuous Learning"]
});

const journey = Journey({
  started: 2022,
  milestones: ["Frontend Development", "Graphic Design", "Full Stack Engineering", "Startup Founder"]
});

// Current mission and long-term vision
const mission = Mission({
  current: "CONSULTIFY",
  objective: "Making expert knowledge universally accessible.",
  nextGoal: "Build products that create real impact."
});

export default developer
  .initialize(workspace)
  .learn(journey)
  .master(expertise)
  .build(mission)
  .ready();
`;

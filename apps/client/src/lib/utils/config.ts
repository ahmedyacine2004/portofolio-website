export const aboutProfileConfig = `import { defineWorkspace } from "@portfolio/core";

type Theme = "vscode-dark" | "light";
type Mode = "development" | "production";

interface WorkspaceConfig {
  repository: string;
  version: string;
  mode: Mode;
  theme: Theme;
}

const config: WorkspaceConfig = {
  repository: "Portfolio Workspace",
  version: "3.0.0",
  mode: "production",
  theme: "vscode-dark"
};

// Register enabled workspace modules
const modules = [
  "3D Workspace",
  "AI Assistant",
  "Integrated Terminal",
  "Command Palette",
  "Live Preview"
] as const;

const features = new Set(modules);

export default defineWorkspace({
  ...config,
  author: "Ahmed Yassine Abbane",
  accentColor: "#007ACC",
  modules: [...features],
  animations: true,
  preload: true,
  lazyLoading: true
});`;

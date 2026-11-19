import { execSync } from "node:child_process";

execSync("pnpm install --frozen-lockfile", { stdio: "inherit" });

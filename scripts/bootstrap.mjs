import { execSync } from "node:child_process";
import { copyFileSync, existsSync, readFileSync } from "node:fs";
import { missingRequired } from "./env.mjs";

execSync("pnpm install --frozen-lockfile", { stdio: "inherit" });

if (!existsSync(".env")) {
  copyFileSync(".env.example", ".env");
  console.log("Created .env from .env.example");
}

const missing = missingRequired(
  readFileSync(".env.example", "utf8"),
  readFileSync(".env", "utf8"),
  process.env,
);
if (missing.length > 0) {
  console.error(`Missing required env vars: ${missing.join(", ")}`);
  console.error("Set them in .env or the environment (see .env.example).");
  process.exit(1);
}

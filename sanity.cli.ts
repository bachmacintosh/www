import { defineCliConfig } from "sanity/cli";
import { loadEnvConfig } from "@next/env";

const dev = process.env.NODE_ENV !== "production";
loadEnvConfig(__dirname, dev, {
  info: console.info,
  error: console.error,
});

if (
  typeof process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === "undefined" ||
  typeof process.env.NEXT_PUBLIC_SANITY_DATASET === "undefined"
) {
  throw new TypeError("Missing Sanity Project ID and/or Dataset");
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export default defineCliConfig({ api: { projectId, dataset } });

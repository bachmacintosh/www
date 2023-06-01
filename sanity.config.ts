import { type Config, defineConfig } from "sanity";
import { codeInput } from "@sanity/code-input";
import createSchema from "./src/lib/sanity/createSchema";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";

if (
  typeof process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === "undefined" ||
  typeof process.env.NEXT_PUBLIC_SANITY_DATASET === "undefined"
) {
  throw new TypeError("Missing Sanity Project ID and/or Dataset");
}
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

const config = defineConfig<Config>({
  basePath: "/studio",
  title: `BachMacintosh (${process.env.NEXT_PUBLIC_SANITY_DATASET})`,
  projectId,
  dataset,
  plugins: [codeInput(), deskTool(), visionTool()],
  schema: createSchema(),
});

export default config;

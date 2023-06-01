import { createClient } from "next-sanity";

if (
  typeof process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === "undefined" ||
  typeof process.env.NEXT_PUBLIC_SANITY_DATASET === "undefined" ||
  typeof process.env.NEXT_PUBLIC_SANITY_API_VERSION === "undefined"
) {
  throw new Error("Missing Sanity Project ID, Dataset, and/or API Version");
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

const fetchSanityStudio = client.fetch.bind(client);

export default fetchSanityStudio;

import { cache } from "react";
import { createClient } from "next-sanity";

if (
  typeof process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === "undefined" ||
  typeof process.env.NEXT_PUBLIC_SANITY_DATASET === "undefined" ||
  typeof process.env.NEXT_PUBLIC_SANITY_API_VERSION === "undefined" ||
  typeof process.env.SANITY_TOKEN === "undefined"
) {
  throw new Error("Missing Sanity Project ID, Dataset, API Version and/or Token");
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;
const token = process.env.SANITY_TOKEN;

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
});

const fetchSanityPrivate = cache(client.fetch.bind(client));

export default fetchSanityPrivate;

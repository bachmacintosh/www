import { groq } from "next-sanity";

export interface BlogContentWarningFragment {
  name: string;
}
export const blogContentWarningFragment = groq`{ name }`;

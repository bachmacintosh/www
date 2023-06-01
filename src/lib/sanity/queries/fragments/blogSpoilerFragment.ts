import { groq } from "next-sanity";

export interface BlogSpoilerFragment {
  name: string;
}
export const blogSpoilerFragment = groq`{ name }`;

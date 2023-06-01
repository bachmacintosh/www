import { type BlogContentWarningFragment, blogContentWarningFragment } from "./fragments/blogContentWarningFragment";
import { type BlogSpoilerFragment, blogSpoilerFragment } from "./fragments/blogSpoilerFragment";
import { type ImageWithAttributesFragment, imageWithAttributesFragment } from "./fragments/imageWithAttributesFragment";
import { type PortableTextFragment, portableTextFragment } from "./fragments/portableTextFragment";
import { groq } from "next-sanity";

const blogPostProjection = groq`{
	title,
	"uniqueSlug": uniqueSlug.current,
	"titleSlug": titleSlug.current,
	publishDate,
	author-> { name },
	contentWarnings[]-> ${blogContentWarningFragment},
	spoilers[]-> ${blogSpoilerFragment},
	coverImage ${imageWithAttributesFragment},
	summary,
	"content": content[] ${portableTextFragment}
}`;

const blogPostSummaryProjection = groq`{
	title,
	"uniqueSlug": uniqueSlug.current,
	"titleSlug": titleSlug.current,
	publishDate,
	author-> { name },
	contentWarnings[]-> ${blogContentWarningFragment},
	spoilers[]-> ${blogSpoilerFragment},
	coverImage ${imageWithAttributesFragment},
	summary
}`;

export interface BlogPostSummary {
  title: string;
  uniqueSlug: string;
  titleSlug: string;
  publishDate: string;
  author: { name: string };
  contentWarnings: BlogContentWarningFragment[] | null;
  spoilers: BlogSpoilerFragment[] | null;
  coverImage: ImageWithAttributesFragment | null;
  summary: string;
}

export type BlogPost = BlogPostSummary & {
  content: [PortableTextFragment, ...PortableTextFragment[]];
};

export interface BlogSlug {
  slug: string;
}

export interface BlogDate {
  publishDate: string;
}

export const blogIndexQuery = groq`*[_type == "blogPost"] | order(dateTime(publishDate) desc) ${blogPostSummaryProjection}`;

export const blogPostByYearQuery = groq`*[_type == "blogPost" && dateTime(publishDate) >= dateTime($year + "-01-01T00:00:00.000Z") && dateTime(publishDate) <= dateTime($year + "-12-31T23:59:59.999Z")] | order(dateTime(publishDate) desc) ${blogPostSummaryProjection}`;

export const blogPostPageQuery = groq`*[_type == "blogPost" && uniqueSlug.current == $slug] ${blogPostProjection}`;

export const blogSlugQuery = groq`*[_type == "blogPost"] { "slug": uniqueSlug.current }`;

export const blogDateQuery = groq`*[_type == "blogPost"] { publishDate }`;

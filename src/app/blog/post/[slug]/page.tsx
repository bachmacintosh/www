import {
  type BlogPost,
  type BlogSlug,
  blogPostPageQuery,
  blogSlugQuery,
} from "../../../../lib/sanity/queries/blogPost";
import { BlogPostTitle, Lede } from "../../../typography";
import SanityImage from "../../../SanityImage";
import SanityPortableText from "../../../SanityPortableText";
import { type TypedObject } from "@portabletext/types";
import fetchSanityPrivate from "../../../../lib/sanity/clients/fetchSanityPrivate";
import { notFound } from "next/navigation";

async function getBlogPost(slug: string): Promise<BlogPost[]> {
  const query = blogPostPageQuery;
  const params = {
    slug,
  };
  const blogPost = await fetchSanityPrivate<BlogPost[]>(query, params);
  return blogPost;
}

async function getBlogPostSlugs(): Promise<BlogSlug[]> {
  const query = blogSlugQuery;
  const slugs = await fetchSanityPrivate<BlogSlug[]>(query);
  return slugs;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugArray: { slug: string }[] = [];
  const slugs = await getBlogPostSlugs();
  slugs.forEach((slugItem) => {
    slugArray.push({ slug: slugItem.slug });
  });
  return slugArray;
}

export default async function BlogPostPage({ params }: { params: { slug: string } }): Promise<JSX.Element> {
  const dateOptions: Intl.DateTimeFormatOptions = {
    dateStyle: "long",
  };
  const posts: BlogPost[] = await getBlogPost(params.slug);
  if (posts.length !== 1) {
    notFound();
  }
  const post = posts[0];
  return (
    <>
      {post.coverImage !== null && (
        <>
          <SanityImage value={post.coverImage} />
          <br />
        </>
      )}
      <BlogPostTitle key={post.uniqueSlug}>{post.title}</BlogPostTitle>
      <br />
      {post.contentWarnings !== null && post.contentWarnings.length > 0 && (
        <>
          <span className="text-sm md:text-base text-yellow-200">
            CW:{` `}
            {post.contentWarnings.map((cWarn, cwIdx, cwArray) => {
              return (
                <>
                  {cWarn.name}
                  {cwIdx + 1 === cwArray.length ? `` : `, `}
                </>
              );
            })}
          </span>
          <br />
        </>
      )}
      {post.spoilers !== null && post.spoilers.length > 0 && (
        <>
          <span className="text-sm md:text-base text-gray-400">
            SPOILERS:{` `}
            {post.spoilers.map((spoiler, spIdx, spArray) => {
              return (
                <>
                  {spoiler.name}
                  {spIdx + 1 === spArray.length ? `` : `, `}
                </>
              );
            })}
          </span>
          <br />
        </>
      )}
      <span className="text-sm md:text-base text-base-content">
        Posted {new Date(post.publishDate).toLocaleString("en-US", dateOptions)}
        {` `}
        by {post.author.name}
      </span>
      <br className="mb-3" />
      <Lede>{post.summary}</Lede>
      <br className="mb-3" />
      <SanityPortableText value={post.content as TypedObject[]} />
    </>
  );
}

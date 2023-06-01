import {
  type BlogDate,
  type BlogPostSummary,
  blogDateQuery,
  blogPostByYearQuery,
} from "../../../lib/sanity/queries/blogPost";
import { BlogPostTitle, Display1, Paragraph } from "../../typography";
import Link from "next/link";
import { type Route } from "next";
import YearList from "./YearList";
import fetchSanityPrivate from "../../../lib/sanity/clients/fetchSanityPrivate";

async function getBlogPosts(year?: string): Promise<BlogPostSummary[]> {
  if (typeof year === "undefined") {
    const query = blogPostByYearQuery;

    const params = {
      year: new Date().getFullYear().toString(),
    };

    const blogPosts = await fetchSanityPrivate<BlogPostSummary[]>(query, params);
    return blogPosts;
  } else {
    const query = blogPostByYearQuery;
    const params = {
      year,
    };
    const blogPosts = await fetchSanityPrivate<BlogPostSummary[]>(query, params);
    return blogPosts;
  }
}

async function getBlogYears(): Promise<Set<number>> {
  const years = new Set<number>();
  const currentYear = new Date().getFullYear();
  const query = blogDateQuery;
  const blogPosts = await fetchSanityPrivate<BlogDate[]>(query);
  blogPosts.forEach((post) => {
    const year = new Date(post.publishDate).getFullYear();
    if (year !== currentYear) {
      years.add(year);
    }
  });
  return years;
}

export default async function BlogIndexPage({ params }: { params: { year?: string[] } }): Promise<JSX.Element> {
  const dateOptions: Intl.DateTimeFormatOptions = {
    dateStyle: "long",
  };
  let blogPosts: BlogPostSummary[] = [];
  const years = await getBlogYears();
  if (typeof params.year === "undefined") {
    blogPosts = await getBlogPosts();
  } else {
    blogPosts = await getBlogPosts(params.year[0]);
  }
  return (
    <>
      <Display1>
        {params.year ? (
          <>
            <Link
              className="overline hover:text-white"
              href={"/blog" as Route}
            >{`Blog`}</Link>
            {` / `}
            {params.year}
          </>
        ) : (
          "Blog"
        )}
      </Display1>
      <br className="mb-3" />
      <hr className="mb-3" />
      {blogPosts.length === 0 && <Paragraph>No blog posts... yet! Check back soon.</Paragraph>}
      {blogPosts.length > 0 &&
        blogPosts.map((post, postIdx) => {
          return (
            <>
              <BlogPostTitle key={post.uniqueSlug}>{post.title}</BlogPostTitle>
              <br className="mb-1" />
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
              <Paragraph>{post.summary}</Paragraph>
              {postIdx !== blogPosts.length - 1 && <hr className="mb-3" />}
            </>
          );
        })}
      {years.size > 0 && (
        <>
          {blogPosts.length > 0 && <hr className="mb-3" />}
          <YearList years={years} />
        </>
      )}
    </>
  );
}

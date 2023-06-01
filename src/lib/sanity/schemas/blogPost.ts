import { type Slug } from "sanity";
import blogAuthor from "./blogAuthor";
import blogContentWarning from "./blogContentWarning";
import blogSpoiler from "./blogSpoilers";
import codeInput from "../types/codeInput";
import fetchSanityStudio from "../clients/fetchSanityStudio";
import { groq } from "next-sanity";
import imageWithAttributes from "../types/imageWithAttributes";
import { s } from "@sanity-typed/schema-builder";

const blogPost = s.document({
  name: "blogPost",
  title: "Blog Post",
  fields: [
    {
      name: "title",
      title: "Title",
      type: s.string(),
    },
    {
      name: "uniqueSlug",
      title: "Unique Slug",
      type: s.slug({
        readOnly: (ctx) => {
          if (typeof ctx.value === "undefined") {
            return false;
          } else {
            const sanitySlug = ctx.value as Slug;
            const slugMinLength = 10;
            return sanitySlug.current.length >= slugMinLength;
          }
        },
        options: {
          source: async () => {
            const slug = await uniqueSlug();
            return slug;
          },
        },
        validation: (rule) => {
          return rule.custom((slug) => {
            const slugMinLength = 10;
            if (typeof slug?.current === "undefined") {
              return "Unique Slug is required.";
            } else if (slug.current.length < slugMinLength) {
              return `Unique Slug must be at least ${slugMinLength} characters.`;
            } else {
              return true;
            }
          });
        },
      }),
    },
    {
      name: "titleSlug",
      title: "Title Slug",
      type: s.slug({
        options: {
          source: "title",
          isUnique: () => {
            return true;
          },
        },
      }),
    },
    {
      name: "publishDate",
      title: "Publish Date",
      type: s.datetime(),
    },
    {
      name: "author",
      title: "Author",
      type: s.reference({
        to: [blogAuthor],
        options: {
          disableNew: true,
        },
      }),
    },
    {
      name: "contentWarnings",
      title: "Content Warnings",
      optional: true,
      type: s.array({
        of: [
          s.reference({
            to: [blogContentWarning],
          }),
        ],
      }),
    },
    {
      name: "spoilers",
      title: "Spoilers",
      optional: true,
      type: s.array({
        of: [
          s.reference({
            to: [blogSpoiler],
          }),
        ],
      }),
    },
    {
      name: "coverImage",
      title: "Cover Image",
      optional: true,
      type: imageWithAttributes,
    },
    {
      name: "summary",
      title: "Summary",
      type: s.text({ max: 1000 }),
    },
    {
      name: "content",
      title: "Content",
      type: s.array({
        of: [
          s.block(),
          imageWithAttributes,
          codeInput({
            withFilename: true,
          }),
        ],
      }),
    },
  ],
});

async function uniqueSlug(): Promise<string> {
  let isUnique = false;
  const length = 10;
  let result = "";
  while (!isUnique) {
    result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    const query = groq`!defined(*[(_type == "blogPost" && uniqueSlug.current == $result)][0]._id)`;
    const params = {
      result,
    };
    // eslint-disable-next-line no-await-in-loop -- Needs to be done in order
    isUnique = await fetchSanityStudio<boolean>(query, params);
  }
  return result.toLowerCase().replace(/\s+/gu, "-");
}

export default blogPost;

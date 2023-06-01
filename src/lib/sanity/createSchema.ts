import blogAuthor from "./schemas/blogAuthor";
import blogContentWarning from "./schemas/blogContentWarning";
import blogPost from "./schemas/blogPost";
import blogSpoiler from "./schemas/blogSpoilers";

const blogAuthorSchema = blogAuthor.schema();
const blogPostSchema = blogPost.schema();
const blogSpoilerSchema = blogSpoiler.schema();
const blogContentWarningSchema = blogContentWarning.schema();

export default function createSchema(): {
  types: [typeof blogAuthorSchema, typeof blogContentWarningSchema, typeof blogPostSchema, typeof blogSpoilerSchema];
} {
  return {
    types: [blogAuthorSchema, blogContentWarningSchema, blogPostSchema, blogSpoilerSchema],
  };
}

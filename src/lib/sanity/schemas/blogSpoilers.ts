import { s } from "@sanity-typed/schema-builder";

const blogSpoiler = s.document({
  name: "blogSpoiler",
  title: "Blog Spoiler",
  fields: [
    {
      name: "name",
      title: "Name",
      type: s.string(),
    },
  ],
});

export default blogSpoiler;

import { s } from "@sanity-typed/schema-builder";

const blogContentWarning = s.document({
  name: "blogContentWarning",
  title: "Blog Content Warning",
  fields: [
    {
      name: "name",
      title: "Name",
      type: s.string(),
    },
  ],
});

export default blogContentWarning;

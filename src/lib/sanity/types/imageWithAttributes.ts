import { s } from "@sanity-typed/schema-builder";

const imageWithAttributes = s.image({
  fieldsets: [
    {
      name: "attributes",
      title: "Attributes",
      options: {
        collapsed: true,
      },
    },
    {
      name: "caption",
      title: "Caption",
      options: {
        collapsed: true,
      },
    },
  ],
  fields: [
    {
      name: "altText",
      title: "Alt Text",
      optional: true,
      type: s.string(),
    },
    {
      name: "caption",
      title: "Caption",
      optional: true,
      type: s.text(),
      fieldset: "caption",
    },
    {
      name: "source",
      title: "Source",
      optional: true,
      type: s.string(),
      fieldset: "attributes",
    },
    {
      name: "sourceUrl",
      title: "Source URL",
      optional: true,
      type: s.url(),
      fieldset: "attributes",
    },
    {
      name: "author",
      title: "Author",
      optional: true,
      type: s.string(),
      fieldset: "attributes",
    },
    {
      name: "authorUrl",
      title: "Author URL",
      optional: true,
      type: s.url(),
      fieldset: "attributes",
    },
    {
      name: "location",
      title: "Location",
      optional: true,
      type: s.string(),
      fieldset: "attributes",
    },
  ],
});

export default imageWithAttributes;

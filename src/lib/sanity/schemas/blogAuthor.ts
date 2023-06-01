import md5 from "md5";
import { s } from "@sanity-typed/schema-builder";

const blogAuthor = s.document({
  name: "blogAuthor",
  title: "Blog Author",
  preview: {
    select: {
      title: "name",
      media: "gravatarEmail",
    },
    prepare: (doc) => {
      const { name, gravatarEmail } = doc;
      if (typeof gravatarEmail === "undefined") {
        return {
          title: name,
        };
      } else {
        const hashedEmail = md5(gravatarEmail.replace(/ /gu, "").toLowerCase());
        const imageUrl = `https://www.gravatar.com/avatar/${hashedEmail}`;
        return {
          title: name,
          imageUrl,
        };
      }
    },
  },
  fields: [
    {
      name: "name",
      title: "Name",
      type: s.string(),
    },
    {
      name: "gravatarEmail",
      title: "Gravatar Email",
      optional: true,
      type: s.string({
        validation: (rule) => {
          return rule.email();
        },
      }),
    },
  ],
});

export default blogAuthor;

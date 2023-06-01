import { type CodeOptions, codeSchema } from "@sanity/code-input";
import { s } from "@sanity-typed/schema-builder";
import { z } from "zod";

/* eslint-disable-next-line @typescript-eslint/explicit-function-return-type,
   @typescript-eslint/explicit-module-boundary-types */
const codeInput = (options: CodeOptions) => {
  return s.createType({
    schema: () => {
      return {
        ...codeSchema,
        options,
      };
    },
    mock: () => {
      const lastLine = 3;
      return {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        _type: "code" as const,
        language: "ts",
        highlightedLines: [1, lastLine],
        code: `import { hello } from "world.js";\n\nconsole.log(hello("World!"));`,
        filename: "index.ts",
      };
    },
    zod: z.object({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      _type: z.literal("code"),
      language: z.string(),
      highlightedLines: z.array(z.number()),
      code: z.string(),
      filename: z.optional(z.string()),
    }),
  });
};

export default codeInput;

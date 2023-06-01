"use client";

import {
  BlockQuote,
  ExternalHyperlink,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  InternalHyperlink,
  OrderedList,
  Paragraph,
  UnorderedList,
} from "./typography";
import {
  PortableText,
  type PortableTextMarkComponentProps,
  type PortableTextProps,
  type PortableTextReactComponents,
} from "@portabletext/react";
import { type PortableTextLink } from "@portabletext/types";
import { type Route } from "next";
import SanityCode from "./SanityCode";
import SanityImage from "./SanityImage";

const components: Partial<PortableTextReactComponents> = {
  types: {
    code: SanityCode,
    image: SanityImage,
  },
  block: {
    h1: Heading1,
    h2: Heading2,
    h3: Heading3,
    h4: Heading4,
    h5: Heading5,
    h6: Heading6,
    blockquote: BlockQuote,
    normal: Paragraph,
  },
  list: {
    bullet: UnorderedList,
    number: OrderedList,
  },
  marks: {
    link: (props: PortableTextMarkComponentProps<PortableTextLink>): JSX.Element => {
      const { children, value } = props;
      const external = typeof value !== "undefined" && !value.href.startsWith("/");
      if (external) {
        return <ExternalHyperlink href={value.href}>{children}</ExternalHyperlink>;
      } else if (typeof value === "undefined") {
        return (
          <ExternalHyperlink
            href="#"
            hideExternalIcon
          >
            [ERROR RANDERING LINK]
          </ExternalHyperlink>
        );
      } else {
        return <InternalHyperlink href={value.href as Route}>{children}</InternalHyperlink>;
      }
    },
  },
};

export default function SanityPortableText(props: PortableTextProps): JSX.Element {
  return (
    <PortableText
      {...props}
      components={components}
    />
  );
}

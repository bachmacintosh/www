import { type ImageWithAttributesFragment, imageWithAttributesFragment } from "./imageWithAttributesFragment";
import { type CodeInputValue } from "@sanity/code-input";
import { type PortableTextBlock } from "@sanity/types";
import { groq } from "next-sanity";

export type PortableTextFragment = CodeInputValue | ImageWithAttributesFragment | PortableTextBlock;

export const portableTextFragment = groq`{
	...select(
		_type == "block" => { ... },
		_type == "code" => { ... },
		_type == "image" => ${imageWithAttributesFragment}
	)
}`;

export default portableTextFragment;

import { groq } from "next-sanity";

export interface ImageWithAttributesFragment {
  asset: {
    url: string;
    mimeType: string;
    metadata: {
      dimensions: {
        width: number;
        height: number;
        aspectRatio: number;
      };
      lqip: string;
      palette: {
        dominant: {
          foreground: string;
          background: string;
        };
      };
    };
  };
  altText: string;
  caption: string | null;
  location: string | null;
  author: string | null;
  authorUrl: string | null;
  source: string | null;
  sourceUrl: string | null;
}

export const imageWithAttributesFragment = groq`{
	_type,
	asset-> {
		url,
		mimeType,
		metadata {
			dimensions {
				width,
				height,
				aspectRatio
			},
			lqip,
			palette {
				dominant {
					foreground,
					background
				}
			}
		}
	},
	altText,
	caption,
	location,
	author,
	authorUrl,
	source,
	sourceUrl
}`;

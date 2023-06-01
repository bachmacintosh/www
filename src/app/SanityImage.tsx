import Image from "next/image";
import { type ImageWithAttributesFragment } from "../lib/sanity/queries/fragments/imageWithAttributesFragment";

export default function SanityImage({ value }: { value: ImageWithAttributesFragment }): JSX.Element {
  const { asset, altText, caption, location, author, authorUrl, source, sourceUrl } = value;
  return (
    <figure className="flex flex-col justify-center items-center">
      <Image
        src={asset.url}
        placeholder="blur"
        blurDataURL={asset.metadata.lqip}
        width={asset.metadata.dimensions.width}
        height={asset.metadata.dimensions.height}
        alt={altText}
      />
      <figcaption className="text-gray-300">
        {location !== null && `${location.toUpperCase()} -- `}
        {caption !== null && caption}
        {(source !== null || author !== null) && ` --`}
        {source !== null && ` Source: `}
        {sourceUrl !== null && (
          <a
            className="underline hover:text-white"
            href={sourceUrl}
            target="_blank"
            rel="noreferrer"
          >
            {source}
          </a>
        )}
        {sourceUrl === null && source}
        {author !== null && ` by `}
        {authorUrl !== null && (
          <a
            className="underline hover:text-white"
            href={authorUrl}
            target="_blank"
            rel="noreferrer"
          >
            {author}
          </a>
        )}
        {authorUrl === null && author}
      </figcaption>
    </figure>
  );
}

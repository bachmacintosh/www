import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { type ReactNode } from "react";
import { type Route } from "next";

const commonHeadingClasses = "text-primary-content font-bold break-words my-5";
const linkClass = "text-primary-content hover:text-base-content underline";
const normalTextClasses = "text-sm md:text-base text-base-content mb-3";
const listClasses = `${normalTextClasses} ml-11`;

export function BlockQuote(props: JSX.IntrinsicElements["blockquote"]): JSX.Element {
  const { children } = props;
  return <blockquote className="border-l-8 border-primary-content pl-2">{children}</blockquote>;
}

export function BlogPostTitle(props: JSX.IntrinsicElements["span"]): JSX.Element {
  const { children } = props;
  return <span className={`mx-auto text-2xl md:text-4xl ${commonHeadingClasses} pb-14`}>{children}</span>;
}

export function Display1(props: JSX.IntrinsicElements["span"]): JSX.Element {
  const { children } = props;
  return <span className={`text-4xl md:text-6xl ${commonHeadingClasses}`}>{children}</span>;
}

export function Heading1(props: JSX.IntrinsicElements["h1"]): JSX.Element {
  const { children } = props;
  return <h1 className={`text-4xl md:text-6xl ${commonHeadingClasses}`}>{children}</h1>;
}

export function Heading2(props: JSX.IntrinsicElements["h2"]): JSX.Element {
  const { children } = props;
  return <h2 className={`text-3xl md:text-5xl ${commonHeadingClasses}`}>{children}</h2>;
}

export function Heading3(props: JSX.IntrinsicElements["h3"]): JSX.Element {
  const { children } = props;
  return <h3 className={`text-2xl md:text-4xl ${commonHeadingClasses}`}>{children}</h3>;
}

export function Heading4(props: JSX.IntrinsicElements["h4"]): JSX.Element {
  const { children } = props;
  return <h4 className={`text-xl md:text-3xl ${commonHeadingClasses}`}>{children}</h4>;
}

export function Heading5(props: JSX.IntrinsicElements["h5"]): JSX.Element {
  const { children } = props;
  return <h5 className={`text-lg md:text-2xl ${commonHeadingClasses}`}>{children}</h5>;
}

export function Heading6(props: JSX.IntrinsicElements["h6"]): JSX.Element {
  const { children } = props;
  return <h6 className={`md:text-xl ${commonHeadingClasses}`}>{children}</h6>;
}

export function InternalHyperlink<T extends string>({
  children,
  href,
}: {
  children: ReactNode;
  href: Route<T> | URL;
}): JSX.Element {
  return (
    <Link
      className={linkClass}
      href={href}
    >
      {children}
    </Link>
  );
}

export function ExternalHyperlink(props: JSX.IntrinsicElements["a"] & { hideExternalIcon?: boolean }): JSX.Element {
  const { children, hideExternalIcon, href } = props;
  return (
    <a
      className={linkClass}
      href={href}
      target="_blank"
      rel="nofollow noopener noreferrer"
    >
      {children}
      {hideExternalIcon !== true && <ArrowTopRightOnSquareIcon className="inline w-4 h-4" />}
    </a>
  );
}

export function Lede(props: JSX.IntrinsicElements["span"]): JSX.Element {
  const { children } = props;
  return <span className={`text-center text-lg md:text-2xl font-thin ${commonHeadingClasses}`}>{children}</span>;
}

export function OrderedList(props: JSX.IntrinsicElements["ol"]): JSX.Element {
  const { children } = props;
  return <ol className={`list-decimal ${listClasses}`}>{children}</ol>;
}

export function Paragraph(props: JSX.IntrinsicElements["p"] & { indent?: number }): JSX.Element {
  let textClass = normalTextClasses;
  const { children, indent } = props;
  if (typeof indent !== "undefined" && indent) {
    textClass += " indent-6";
  }
  return <p className={textClass}>{children}</p>;
}

export function UnorderedList(props: JSX.IntrinsicElements["ul"]): JSX.Element {
  const { children } = props;
  return <ul className={`list-disc ${listClasses}`}>{children}</ul>;
}

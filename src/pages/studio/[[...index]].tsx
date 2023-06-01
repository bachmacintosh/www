import Head from "next/head";
import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";
import { metadata } from "next-sanity/studio/metadata";

export default function StudioPage(): JSX.Element {
  return (
    <>
      <Head>
        {Object.entries(metadata).map(([key, value]) => {
          return (
            <meta
              key={key}
              name={key}
              content={value}
            />
          );
        })}
      </Head>
      <NextStudio config={config} />
    </>
  );
}

"use client";

import { Display1, InternalHyperlink } from "../../typography";
import { type Route } from "next";

import { usePathname } from "next/navigation";

export default function YearList({ years }: { years: Set<number> }): JSX.Element | null {
  const pathname = usePathname();
  const yearArray = Array.from(years);
  const currentYear = new Date().getFullYear();
  const liClass = "mr-4";
  return (
    <>
      <Display1>More Blog Posts</Display1>
      <br className="mb-3" />
      <div className="w-full flex flex-row">
        <span className={liClass}>View more posts from: </span>
        <ul className="flex flex-wrap items-center justify-center">
          {pathname !== "/blog" && pathname !== `/blog/${currentYear.toString()}` && (
            <li className={liClass}>
              <InternalHyperlink href={`/blog` as Route}>{currentYear}</InternalHyperlink>
            </li>
          )}

          {yearArray
            .sort((yearA, yearB) => {
              return yearB - yearA;
            })
            .map((year) => {
              if (pathname === null || pathname.includes(year.toString())) {
                return (
                  <li
                    key={year}
                    className={liClass}
                  >
                    {year} (current)
                  </li>
                );
              } else {
                return (
                  <li
                    key={year}
                    className={liClass}
                  >
                    <InternalHyperlink href={`/blog/${year.toString()}` as Route}>{year}</InternalHyperlink>
                  </li>
                );
              }
            })}
        </ul>
      </div>
    </>
  );
}

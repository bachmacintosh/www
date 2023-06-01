import { type CodeInputValue } from "@sanity/code-input";
import { Prism } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function SanityCode({ value }: { value: CodeInputValue }): JSX.Element {
  const { code, filename, language } = value;
  return (
    <>
      <br className="mb-3" />
      <div className="bg-amber-800">
        <div className="px-3 py-1 my-1">
          <span className="text-white">{filename}</span>
        </div>
      </div>
      <Prism
        // eslint-disable-next-line react/forbid-component-props
        style={vscDarkPlus}
        language={language}
        showLineNumbers
      >
        {code ?? ""}
      </Prism>
      <br className="mb-3" />
    </>
  );
}

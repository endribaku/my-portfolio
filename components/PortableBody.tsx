import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

type Props = {
  value: PortableTextBlock[];
};

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
  },
  marks: {
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noreferrer"
        className="underline decoration-dotted underline-offset-2"
      >
        {children}
      </a>
    ),
  },
};

export function PortableBody({ value }: Props) {
  if (!value?.length) return null;
  return (
    <div className="space-y-6">
      <PortableText value={value} components={components} />
    </div>
  );
}

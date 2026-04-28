import Link from "next/link";
import type { ProjectListItem } from "@/lib/sanity/types";

type Props = {
  project: ProjectListItem;
};

export function ProjectCard({ project }: Props) {
  const { title, slug, thumbnailImage } = project;
  const altText = thumbnailImage.alt ?? title;

  return (
    <Link
      href={`/work/${slug}`}
      className="group flex aspect-4/3 items-end bg-fg px-4 pb-3"
      aria-label={title}
    >
      <span className="text-text">{altText}</span>
    </Link>
  );
}

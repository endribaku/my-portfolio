import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";
import type { ProjectListItem } from "@/lib/sanity/types";

type Props = {
  project: ProjectListItem;
};

export function ProjectCard({ project }: Props) {
  const { title, slug, thumbnailImage } = project;
  const altText = thumbnailImage.alt ?? title;
  const imageUrl = urlFor(thumbnailImage).width(900).height(675).fit("crop").url();

  return (
    <Link
      href={`/work/${slug}`}
      className="group block aspect-4/3 overflow-hidden bg-fg"
      aria-label={title}
    >
      <Image
        src={imageUrl}
        alt={altText}
        width={900}
        height={675}
        className="h-full w-full object-cover"
      />
    </Link>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Gallery } from "@/components/Gallery";
import { PortableBody } from "@/components/PortableBody";
import { client } from "@/lib/sanity/client";
import { projectBySlugQuery, projectSlugsQuery } from "@/lib/sanity/queries";
import type { Project } from "@/lib/sanity/types";

export const revalidate = 60;

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const slugs = await client.fetch<string[]>(projectSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const project = await client.fetch<Project | null>(projectBySlugQuery, {
    slug,
  });
  if (!project) return {};
  return {
    title: `${project.title} — Endri Baku`,
    description: project.description,
  };
}

export default async function ProjectPage(props: {
  params: Promise<Params>;
}) {
  const { slug } = await props.params;
  const project = await client.fetch<Project | null>(projectBySlugQuery, {
    slug,
  });

  if (!project) notFound();

  return (
    <>
      <main className="max-w-5xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8 md:gap-16">
          <div>
            <Link
              href="/"
              className="text-link underline decoration-dotted underline-offset-2"
            >
              Back
            </Link>
          </div>
          <div className="max-w-xl space-y-6">
            {project.description && <p>{project.description}</p>}
            {project.externalLink && (
              <p>
                <a
                  href={project.externalLink.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-link underline decoration-dotted underline-offset-2"
                >
                  {project.externalLink.kind === "site"
                    ? "Visit site"
                    : "View source"}
                </a>
              </p>
            )}
            {project.body && <PortableBody value={project.body} />}
          </div>
        </div>
      </main>

      {project.galleryImages && project.galleryImages.length > 0 && (
        <div className="pb-16 md:pb-24">
          <Gallery
            images={project.galleryImages}
            fallbackAlt={project.title}
          />
        </div>
      )}
    </>
  );
}

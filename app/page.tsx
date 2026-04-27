import { Intro } from "@/components/Intro";
import { WorkGrid } from "@/components/WorkGrid";
import { client } from "@/lib/sanity/client";
import { allProjectsQuery } from "@/lib/sanity/queries";
import type { ProjectListItem } from "@/lib/sanity/types";

export const revalidate = 60;

export default async function HomePage() {
  const projects = await client.fetch<ProjectListItem[]>(allProjectsQuery);

  return (
    <main className="max-w-5xl mx-auto px-6 md:px-10 py-16 md:py-24">
      <Intro />
      <WorkGrid projects={projects} />
    </main>
  );
}

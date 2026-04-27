import { ProjectCard } from "./ProjectCard";
import type { ProjectListItem } from "@/lib/sanity/types";

type Props = {
  projects: ProjectListItem[];
};

export function WorkGrid({ projects }: Props) {
  return (
    <section className="mt-32">
      <h2 className="text-xs uppercase tracking-[0.2em] text-muted mb-8">
        Work
      </h2>

      {projects.length === 0 ? (
        <p className="text-muted">No projects yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}

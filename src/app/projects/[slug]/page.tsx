import { notFound } from "next/navigation";
import Pager from "@/components/_projectpage/pager";
import { getAllProjects } from "@/lib/loadmd";

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export default function ProjectDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const projects = getAllProjects();
  const projectIndex = projects.findIndex(
    (project) => project.slug === params.slug,
  );

  if (projectIndex === -1) {
    notFound();
  }

  const project = projects[projectIndex];
  const previousProject = projects[projectIndex - 1];
  const nextProject = projects[projectIndex + 1];

  return (
    <Pager
      project={project}
      previousProjectSlug={previousProject?.slug ?? null}
      nextProjectSlug={nextProject?.slug ?? null}
    />
  );
}

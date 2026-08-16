"use client";

import { Project } from "@/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "@/styles/projects.module.css";
import ProjectHolder from "@/components/_projectpage/projectholder";
import Navbar from "@/components/navbar";
import Pager from "@/components/_projectpage/pager";

export default function ProjectsPage({ projects }: { projects: Project[] }) {
  const [activeTag, setActiveTag] = useState("");
  const [activeProjectSlug, setActiveProjectSlug] = useState("");
  const tags = useMemo(
    () => Array.from(new Set(projects.flatMap((project) => project.tags))).sort(),
    [projects],
  );
  const filteredProjects = activeTag
    ? projects.filter((project) => project.tags.includes(activeTag))
    : projects;

  const activeProject = projects.find(
    (project) => project.slug === activeProjectSlug,
  );

  const changeProjectFromHash = useCallback(() => {
    try {
      setActiveProjectSlug(decodeURIComponent(window.location.hash.slice(1)));
    } catch {
      setActiveProjectSlug("");
    }
  }, []);

  useEffect(() => {
    window.addEventListener("hashchange", changeProjectFromHash);
    window.addEventListener("popstate", changeProjectFromHash);
    changeProjectFromHash();

    return () => {
      window.removeEventListener("hashchange", changeProjectFromHash);
      window.removeEventListener("popstate", changeProjectFromHash);
    };
  }, [changeProjectFromHash]);

  const getAdjacentProjectSlug = (direction: -1 | 1) => {
    const currentPosition = filteredProjects.findIndex(
      (project) => project.slug === activeProject?.slug,
    );
    const nextPosition = currentPosition + direction;
    const adjacentProject =
      currentPosition !== -1 ? filteredProjects[nextPosition] : undefined;

    return adjacentProject?.slug ?? null;
  };

  return (
    <main>
      {!activeProject ? (
        <>
          <Navbar to_path="/" name="Home" />
          <div className={styles.projectMainDiv}>
            <h1>My Projects</h1>
            <div className={styles.filterTags} aria-label="Filter projects by tag">
              <button type="button" className={activeTag === "" ? styles.activeTag : ""} aria-pressed={activeTag === ""} onClick={() => setActiveTag("")}>SHOW ALL</button>
              {tags.map((tag) => (
                <button type="button" key={tag} className={activeTag === tag ? styles.activeTag : ""} aria-pressed={activeTag === tag} onClick={() => setActiveTag(tag)}>{tag}</button>
              ))}
            </div>
            <hr />
            <div className={styles.projectsGrid}>
              {filteredProjects.map((project, index) => (
                <ProjectHolder key={project.slug} project={project} projectSlug={project.slug} priority={index < 2} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <Pager
          key={activeProject.slug}
          project={activeProject}
          previousProjectSlug={getAdjacentProjectSlug(-1)}
          nextProjectSlug={getAdjacentProjectSlug(1)}
        />
      )}
    </main>
  );
}

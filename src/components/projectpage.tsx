"use client";

import { Project } from "@/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "@/styles/projects.module.css";
import ProjectHolder from "@/components/_projectpage/projectholder";
import Navbar from "@/components/navbar";
import Pager from "@/components/_projectpage/pager";

export default function ProjectsPage({ projects }: { projects: Project[] }) {
  const [activeTag, setActiveTag] = useState("");
  const [activeProject, setActiveProject] = useState(-1);
  const tags = useMemo(
    () => Array.from(new Set(projects.flatMap((project) => project.tags))).sort(),
    [projects],
  );
  const filteredProjects = activeTag
    ? projects.filter((project) => project.tags.includes(activeTag))
    : projects;

  const changeProjectFromHash = useCallback(() => {
    const projectIndex = Number.parseInt(window.location.hash.slice(1), 10);
    setActiveProject(
      Number.isInteger(projectIndex) && projectIndex >= 0 && projectIndex < projects.length
        ? projectIndex
        : -1,
    );
  }, [projects.length]);

  useEffect(() => {
    window.addEventListener("hashchange", changeProjectFromHash);
    window.addEventListener("popstate", changeProjectFromHash);
    changeProjectFromHash();

    return () => {
      window.removeEventListener("hashchange", changeProjectFromHash);
      window.removeEventListener("popstate", changeProjectFromHash);
    };
  }, [changeProjectFromHash]);

  const getAdjacentProjectIndex = (direction: -1 | 1) => {
    const currentPosition = filteredProjects.findIndex(
      (project) => project.slug === projects[activeProject]?.slug,
    );
    const nextPosition = currentPosition + direction;

    const adjacentProject = currentPosition !== -1 ? filteredProjects[nextPosition] : undefined;
    return adjacentProject ? projects.indexOf(adjacentProject) : null;
  };

  return (
    <main>
      {activeProject === -1 ? (
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
                <ProjectHolder key={project.slug} project={project} projectKey={projects.indexOf(project)} priority={index < 2} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <Pager
          key={projects[activeProject].slug}
          project={projects[activeProject]}
          previousProjectIndex={getAdjacentProjectIndex(-1)}
          nextProjectIndex={getAdjacentProjectIndex(1)}
        />
      )}
    </main>
  );
}

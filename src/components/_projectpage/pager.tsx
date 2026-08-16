"use client";

import { Project } from "@/types";
import { useState } from "react";
import ImageSlider from "@/components/_projectpage/imageslider";
import styles from "@/styles/pager.module.css";
import Markdown from "react-markdown";
import ProjectLinks from "@/components/_projectpage/projectlinks";

export default function Pager({
  project,
  previousProjectIndex,
  nextProjectIndex,
}: {
  project: Project;
  previousProjectIndex: number | null;
  nextProjectIndex: number | null;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageCount = project.images.length;

  const switchImage = (index: number) => {
    setCurrentImageIndex((index + imageCount) % imageCount);
  };

  return (
    <main className={styles.pagerMainDiv}>
      <nav className={styles.navBar} aria-label="Project navigation">
        <a href="/projects">EXIT</a>
        <div className={styles.arrowContainer}>
          {previousProjectIndex !== null ? (
            <a
              className={styles.leftButton}
              href={`/projects#${previousProjectIndex}`}
              aria-label="Previous project"
            >
              <em aria-hidden="true" />
            </a>
          ) : (
            <span className={styles.leftButton} aria-hidden="true" />
          )}
          {nextProjectIndex !== null ? (
            <a
              className={styles.rightButton}
              href={`/projects#${nextProjectIndex}`}
              aria-label="Next project"
            >
              <em aria-hidden="true" />
            </a>
          ) : (
            <span className={styles.rightButton} aria-hidden="true" />
          )}
        </div>
      </nav>

      <div className={styles.pagerBody}>
        <div className={styles.pagerContent}>
          <article>
            <header>
              <h1>{project.name}</h1>
              <p>{project.shortDescription}</p>
              <ProjectLinks links={project.links} classname={styles.projectLinksDiv} />
            </header>

            <ImageSlider
              projectName={project.name}
              image={project.images[currentImageIndex]}
              totalImages={imageCount}
              setImage={switchImage}
              index={currentImageIndex}
            />

            <section>
              <h2>About</h2>
              <div className={styles.contentDiv}>
                <Markdown>{project.content}</Markdown>
              </div>
            </section>

            <section>
              <h2>Toolbox</h2>
              <small>Programming languages, frameworks, libraries, tools, and technologies used in this project</small>
              <div className={`${styles.contentDiv} ${styles.skillsContainer}`}>
                {project.skills.map((skill) => <span key={skill}>{skill}</span>)}
              </div>
            </section>

            <section>
              <h2>Links</h2>
              <div className={styles.contentDivLi}>
                <ul>
                  {project.links.map(({ name, url }) => (
                    <li key={name}>
                      {name.charAt(0).toUpperCase() + name.slice(1)}:{" "}
                      <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </article>
        </div>
      </div>
    </main>
  );
}

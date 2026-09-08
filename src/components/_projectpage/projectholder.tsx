import Image from "next/image";
import { Project } from "@/types";
import styles from "@/styles/prholder.module.css";

export default function ProjectHolder({
  project,
  projectSlug,
  priority = false,
}: {
  project: Project;
  projectSlug: string;
  priority?: boolean;
}) {
  const visibleSkills = project.skills.slice(0, 5);

  return (
    <a className={styles.projectHolder} href={`/projects/${projectSlug}`}>
      <div className={styles.Image}>
        <Image
          src={project.images[0]}
          alt={project.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
        />
      </div>
      <span className={styles.prtitle}>{project.name}</span>
      {project.archived && <span className={styles.archivedBadge}>Archived</span>}
      <span className={styles.prduration}>{project.range}</span>

      <div className={styles.overlayDiv}>
        <span className={styles.ovdTitle}>{project.shortDescription}</span>
        <div className={styles.ovdSkills}>
          {visibleSkills.map((skill) => <span key={skill}>{skill}</span>)}
          {project.skills.length > visibleSkills.length && (
            <span className={styles.lastSpan}>&amp; more...</span>
          )}
        </div>
      </div>
    </a>
  );
}

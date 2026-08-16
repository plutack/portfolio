import Link from "next/link";
import Image from "next/image";
import { Project } from "@/types";
import styles from "@/styles/homepage.module.css";

export default function ProjectsSection({ projects }: { projects: Project[] }) {
    const visibleProjects = projects.slice(0, 5);

    return (
        <section id="projects" className={styles.projectsDiv}>
            <h2 className={styles.projectsHeading}>My Projects</h2>
            <p className={styles.projectsSub}>
                A selection of things I&apos;ve built.
            </p>
            <div className={styles.projectsGrid}>
                {visibleProjects.map((project, index) => (
                    <Link
                        key={project.slug}
                        href={`/projects#${project.slug}`}
                        className={styles.projectCard}
                    >
                        <div className={styles.projectCardImage}>
                            <Image
                                src={project.images[0]}
                                alt={project.name}
                                fill
                                sizes={index === 0
                                    ? "(max-width: 768px) 100vw, 90vw"
                                    : "(max-width: 768px) 100vw, 45vw"}
                                priority={index === 0}
                            />
                        </div>
                        <div className={styles.projectCardBody}>
                            <div className={styles.projectCardHeader}>
                                <span className={styles.projectCardTitle}>{project.name}</span>
                                {project.archived && <span className={styles.archivedBadge}>Archived</span>}
                            </div>
                            <span className={styles.projectCardDuration}>{project.range}</span>
                            <p className={styles.projectCardDesc}>{project.shortDescription}</p>
                        </div>
                    </Link>
                ))}
            </div>
            {projects.length > visibleProjects.length && (
                <Link href="/projects" className={styles.projectsMoreLink}>
                    View all projects
                </Link>
            )}
        </section>
    );
}

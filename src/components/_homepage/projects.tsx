import Link from "next/link";
import Image from "next/image";
import { Project } from "@/types";
import styles from "@/styles/homepage.module.css";

export default function ProjectsSection(props: { projects: Project[] }) {
    const { projects } = props;
    const ordered = projects;

    return (
        <section id='projects' className={styles.projectsDiv}>
            <h2 className={styles.projectsHeading}>My Projects</h2>
            <p className={styles.projectsSub}>
                A selection of things I&apos;ve built.{" "}
                <Link href="/projects">View all &rarr;</Link>
            </p>
            <div className={styles.projectsGrid}>
                {ordered.map((project, index) => (
                    <Link
                        key={project.slug}
                        href={`/projects#${projects.indexOf(project)}`}
                        className={styles.projectCard}
                    >
                        <div className={styles.projectCardImage}>
                            <Image
                                src={project.images[0]}
                                alt={project.name}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
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
        </section>
    );
}

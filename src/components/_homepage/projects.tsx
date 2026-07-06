import Link from "next/link";
import Image from "next/image";
import { Project } from "@/types";
import styles from "@/styles/homepage.module.css";

export default function ProjectsSection(props: { projects: Project[] }) {
    const { projects } = props;
    // projects come sorted ascending by date; show newest first but keep the
    // original index so cards deep-link into the /projects pager (#idx).
    const ordered = projects
        .map((p, idx) => ({ p, idx }))
        .reverse();

    return (
        <section id='projects' className={styles.projectsDiv}>
            <h2 className={styles.projectsHeading}>My Projects</h2>
            <p className={styles.projectsSub}>
                A selection of things I&apos;ve built.{" "}
                <Link href="/projects">View all &rarr;</Link>
            </p>
            <div className={styles.projectsGrid}>
                {ordered.map(({ p, idx }) => (
                    <Link
                        key={idx}
                        href={`/projects#${idx}`}
                        className={styles.projectCard}
                    >
                        <div className={styles.projectCardImage}>
                            <Image
                                src={p.images[0]}
                                alt={p.name}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                unoptimized={true}
                            />
                        </div>
                        <div className={styles.projectCardBody}>
                            <div className={styles.projectCardHeader}>
                                <span className={styles.projectCardTitle}>{p.name}</span>
                                {p.archived && <span className={styles.archivedBadge}>Archived</span>}
                            </div>
                            <span className={styles.projectCardDuration}>{p.range}</span>
                            <p className={styles.projectCardDesc}>{p.shortDescription}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}

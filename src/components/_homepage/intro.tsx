import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types";
import styles from "@/styles/homepage.module.css";

export default function Intro({ project }: { project: Project }) {
  return (
    <section id="intro" className={styles.introDiv}>
      <div className={styles.introCopy}>
        <p className={styles.eyebrow}>Software Engineer</p>
        <h1>Hi, I&apos;m Talut Salako.</h1>
        <p className={styles.introRole}>
          I build reliable backend systems, APIs, web applications, and developer tools with Go, Python, and TypeScript.
        </p>
        <div className={styles.introActions}>
          <Link className={styles.primaryAction} href={`/projects/${project.slug}`}>View selected work</Link>
          <a className={styles.secondaryAction} href="#contact">Get in touch</a>
        </div>
      </div>
      <div className={styles.introVisual}>
        <div className={styles.introVisualLabel}>Selected project</div>
        <Link className={styles.introProjectLink} href={`/projects/${project.slug}`}>
          <div className={styles.introImage}>
            <Image
              src={project.images[0]}
              alt={project.name}
              fill
              priority
              sizes="(max-width: 767px) 100vw, 48vw"
            />
          </div>
          <div className={styles.introCaption}>
            <div className={styles.introCaptionCopy}>
              <span>{project.name}</span>
              <span>{project.shortDescription}</span>
            </div>
            <span className={styles.introProjectCue}>View project</span>
          </div>
        </Link>
      </div>
    </section>
  );
}

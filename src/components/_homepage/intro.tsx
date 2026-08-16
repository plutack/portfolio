import Image from "next/image";
import styles from "@/styles/homepage.module.css";

export default function Intro() {
  return (
    <section id="intro" className={styles.introDiv}>
      <div className={styles.introCopy}>
        <p className={styles.eyebrow}>Software Engineer</p>
        <h1>Hi, I&apos;m Talut Salako.</h1>
        <p className={styles.introRole}>
          I build reliable backend systems, APIs, web applications, and developer tools with Go, Python, and TypeScript.
        </p>
        <div className={styles.introActions}>
          <a className={styles.primaryAction} href="#projects">View selected work</a>
          <a className={styles.secondaryAction} href="#contact">Get in touch</a>
        </div>
      </div>
      <div className={styles.introVisual}>
        <div className={styles.introVisualLabel}>Selected project</div>
        <div className={styles.introImage}>
          <Image
            src="/images/nadbooks/landing.png"
            alt="Nadbooks web application"
            fill
            priority
            sizes="(max-width: 767px) 100vw, 48vw"
          />
        </div>
        <div className={styles.introCaption}>
          <span>Nadbooks</span>
          <span>API and product engineering</span>
        </div>
      </div>
    </section>
  );
}

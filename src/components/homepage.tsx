"use client";

import styles from "@/styles/homepage.module.css";

export default function HomePage({
  sections,
}: {
  sections: Record<string, JSX.Element>;
}) {
  return (
    <div className={styles.homepageContent}>
      {Object.entries(sections).map(([key, section]) => (
        <div className={styles.homepageSection} key={key}>
          {section}
        </div>
      ))}
    </div>
  );
}

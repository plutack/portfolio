import styles from '@/styles/homepage.module.css';

export default function Intro() {
    return <section id='intro' className={styles.introDiv}>
        <h1>{"Hi,"}</h1>
        <span><h6>{"I'm "}</h6><h3>{"Talut Salako"}</h3></span>
        <h4>Software Engineer</h4>
        <p className={styles.introSummary}>
            I build reliable backend systems, APIs, web applications, and developer tools using Go, Python, and TypeScript.
        </p>
      </section>
}
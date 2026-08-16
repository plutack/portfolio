import email from '@/../_content/email.json';
import styles from '@/styles/homepage.module.css';


export default function Contact() {
    return <section id='contact' className={styles.contactDiv}>
        {/* TODO: add a contact form */}
    <p>Send me an email at</p>
    <h3><a href={`mailto:${email}`} className={styles.emailLink}>{email}</a></h3>
    <p>or drop a &quot;Hi&quot; in my DMs.</p>
    

    <a href='/resume.pdf' className={styles.resumeBtn} target='_blank' rel="noopener noreferrer">View My Resume</a>
</section>
}
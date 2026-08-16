import Link from "next/link";
import styles from "@/styles/navbar.module.css";
import Logo from "@/components/logo";

export default function Navbar({ to_path, name }: { to_path: string; name: string }) {
  const isHomePage = to_path === "/projects";

  return (
    <header className={styles.header}>
      <nav className={styles.navbar} aria-label="Primary navigation">
        <Link className={styles.logo} href="/" aria-label="Talut Salako, home">
          <Logo />
          <span>Talut Salako</span>
        </Link>

        <div className={styles.links}>
          {isHomePage && (
            <>
              <a href="#about">About</a>
              <a href="#experience">Experience</a>
              <a href="#contact">Contact</a>
            </>
          )}
          <Link className={styles.routeButton} href={to_path}>{name}</Link>
        </div>
      </nav>
    </header>
  );
}

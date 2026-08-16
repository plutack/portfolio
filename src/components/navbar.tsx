import Link from "next/link";
import styles from "@/styles/navbar.module.css";
import Logo from "@/components/logo";

export default function Navbar({ to_path, name }: { to_path: string; name: string }) {
  return (
    <nav className={styles.navbar} aria-label="Primary navigation">
      <Link className={styles.logo} href="/" aria-label="Talut Salako — home">
        <Logo />
      </Link>
      <Link className={styles.routeb} href={to_path}>{name}</Link>
    </nav>
  );
}

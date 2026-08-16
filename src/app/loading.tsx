import styles from '@/styles/loading.module.css';

export default function Loading() {
  const barCount = 3;

  return (
    <div className={styles.center} aria-label="Loading">
      {Array.from({ length: barCount }, (_, index) => (
        <div
          key={index}
          style={{ animationDelay: `${(-0.6 * index) / (barCount - 1)}s` }}
          className={styles.wave}
        />
      ))}
    </div>
  );
}
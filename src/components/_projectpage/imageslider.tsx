"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";
import styles from "@/styles/imgslider.module.css";

export default function ImageSlider({
  projectName,
  image,
  totalImages,
  index,
  setImage,
}: {
  projectName: string;
  image: string;
  totalImages: number;
  index: number;
  setImage: (index: number) => void;
}) {
  const hasMultipleImages = totalImages > 1;
  const showImage = useCallback((nextIndex: number) => setImage(nextIndex), [setImage]);

  useEffect(() => {
    if (!hasMultipleImages) return;

    const interval = window.setInterval(() => showImage(index + 1), 25_000);
    return () => window.clearInterval(interval);
  }, [hasMultipleImages, index, showImage]);

  return (
    <div className={styles.imgSliderContainer}>
      <div className={styles.Images}>
        <Image
          src={image}
          alt={`${projectName} screenshot ${index + 1} of ${totalImages}`}
          fill
          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 80vw, 55vw"
          priority={index === 0}
        />
        {hasMultipleImages && (
          <>
            <button
              type="button"
              onClick={() => showImage(index - 1)}
              className={styles.leftButton}
              aria-label="Previous image"
            >
              <span aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => showImage(index + 1)}
              className={styles.rightButton}
              aria-label="Next image"
            >
              <span aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      {hasMultipleImages && (
        <div className={styles.selectImage} aria-label="Choose project image">
          {Array.from({ length: totalImages }, (_, imageIndex) => (
            <button
              type="button"
              key={imageIndex}
              onClick={() => showImage(imageIndex)}
              className={`${styles.dotMarker} ${imageIndex === index ? styles.selectedPoint : ""}`}
              aria-label={`Show image ${imageIndex + 1}`}
              aria-current={imageIndex === index}
            />
          ))}
        </div>
      )}
    </div>
  );
}

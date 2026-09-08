"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
  const [isExpanded, setIsExpanded] = useState(false);
  const lightboxRef = useRef<HTMLDialogElement>(null);
  const showImage = useCallback((nextIndex: number) => setImage(nextIndex), [setImage]);

  useEffect(() => {
    if (!hasMultipleImages || isExpanded) return;

    const interval = window.setInterval(() => showImage(index + 1), 25_000);
    return () => window.clearInterval(interval);
  }, [hasMultipleImages, index, isExpanded, showImage]);

  useEffect(() => {
    const lightbox = lightboxRef.current;
    if (!lightbox) return;

    if (isExpanded && !lightbox.open) {
      lightbox.showModal();
    } else if (!isExpanded && lightbox.open) {
      lightbox.close();
    }
  }, [isExpanded]);

  const imageDescription = `${projectName} screenshot ${index + 1} of ${totalImages}`;

  return (
    <div className={styles.imgSliderContainer}>
      <div className={styles.Images}>
        <button
          type="button"
          className={styles.expandButton}
          onClick={() => setIsExpanded(true)}
          aria-label={`Open ${imageDescription} in full-screen viewer`}
          title="View larger"
        >
          <Image
            src={image}
            alt={imageDescription}
            fill
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 80vw, 55vw"
            priority={index === 0}
          />
        </button>
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

      <dialog
        ref={lightboxRef}
        className={styles.lightbox}
        aria-label={`${projectName} image viewer`}
        onCancel={() => setIsExpanded(false)}
        onClose={() => setIsExpanded(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setIsExpanded(false);
        }}
        onKeyDown={(event) => {
          if (!hasMultipleImages) return;
          if (event.key === "ArrowLeft") showImage(index - 1);
          if (event.key === "ArrowRight") showImage(index + 1);
        }}
      >
        <div className={styles.lightboxHeader}>
          <span>{imageDescription}</span>
          <button type="button" onClick={() => setIsExpanded(false)}>Close</button>
        </div>
        <div className={styles.lightboxImage}>
          <Image
            src={image}
            alt={imageDescription}
            fill
            sizes="100vw"
          />
        </div>
        {hasMultipleImages && (
          <div className={styles.lightboxControls}>
            <button type="button" onClick={() => showImage(index - 1)}>Previous</button>
            <span aria-live="polite">{index + 1} / {totalImages}</span>
            <button type="button" onClick={() => showImage(index + 1)}>Next</button>
          </div>
        )}
      </dialog>
    </div>
  );
}

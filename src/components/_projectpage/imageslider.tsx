"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "@/styles/imgslider.module.css";

export default function ImageSlider({
  projectName,
  images,
  index,
  setImage,
}: {
  projectName: string;
  images: string[];
  index: number;
  setImage: (index: number) => void;
}) {
  const image = images[index];
  const totalImages = images.length;
  const hasMultipleImages = totalImages > 1;
  const [isExpanded, setIsExpanded] = useState(false);
  const [loadedImage, setLoadedImage] = useState<string | null>(null);
  const [failedImage, setFailedImage] = useState<string | null>(null);
  const [reloadAttempt, setReloadAttempt] = useState(0);
  const lightboxRef = useRef<HTMLDialogElement>(null);
  const showImage = useCallback((nextIndex: number) => setImage(nextIndex), [setImage]);
  const imageFailed = failedImage === image;
  const imageLoading = loadedImage !== image && !imageFailed;

  useEffect(() => {
    if (!hasMultipleImages) return;

    const neighborImages = [
      images[(index + 1) % totalImages],
      images[(index - 1 + totalImages) % totalImages],
    ];

    neighborImages.forEach((source) => {
      const preload = new window.Image();
      preload.decoding = "async";
      preload.src = source;
    });
  }, [hasMultipleImages, images, index, totalImages]);

  useEffect(() => {
    if (!hasMultipleImages || isExpanded || imageLoading) return;

    const interval = window.setInterval(() => showImage(index + 1), 25_000);
    return () => window.clearInterval(interval);
  }, [hasMultipleImages, imageLoading, index, isExpanded, showImage]);

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
  const markImageLoaded = () => {
    setLoadedImage(image);
    setFailedImage(null);
  };
  const markImageFailed = () => setFailedImage(image);
  const retryImage = () => {
    setFailedImage(null);
    setLoadedImage(null);
    setReloadAttempt((attempt) => attempt + 1);
  };

  const imageStatus = imageLoading ? (
    <div className={styles.imageStatus} role="status" aria-live="polite">
      <span>Loading image</span>
      <span className={styles.loadingBar} aria-hidden="true" />
    </div>
  ) : imageFailed ? (
    <div className={`${styles.imageStatus} ${styles.imageError}`} role="alert">
      <span>Image could not be loaded.</span>
      <button type="button" onClick={retryImage}>Retry</button>
    </div>
  ) : null;

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
            key={`${image}-${reloadAttempt}`}
            src={image}
            alt={imageDescription}
            fill
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 80vw, 55vw"
            priority={index === 0}
            onLoad={markImageLoaded}
            onError={markImageFailed}
          />
        </button>
        {imageStatus}
        {hasMultipleImages && (
          <>
            <button
              type="button"
              onClick={() => showImage(index - 1)}
              className={styles.leftButton}
              aria-label="Previous image"
              disabled={imageLoading}
            >
              <span aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => showImage(index + 1)}
              className={styles.rightButton}
              aria-label="Next image"
              disabled={imageLoading}
            >
              <span aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      {hasMultipleImages && (
        <div className={styles.selectImage} aria-label="Choose project image">
          {images.map((_, imageIndex) => (
            <button
              type="button"
              key={imageIndex}
              onClick={() => showImage(imageIndex)}
              className={`${styles.dotMarker} ${imageIndex === index ? styles.selectedPoint : ""}`}
              aria-label={`Show image ${imageIndex + 1}`}
              aria-current={imageIndex === index}
              disabled={imageLoading}
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
          if (!hasMultipleImages || imageLoading) return;
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
            key={`lightbox-${image}-${reloadAttempt}`}
            src={image}
            alt={imageDescription}
            fill
            sizes="100vw"
            onLoad={markImageLoaded}
            onError={markImageFailed}
          />
          {imageStatus}
        </div>
        {hasMultipleImages && (
          <div className={styles.lightboxControls}>
            <button type="button" onClick={() => showImage(index - 1)} disabled={imageLoading}>Previous</button>
            <span aria-live="polite">{index + 1} / {totalImages}</span>
            <button type="button" onClick={() => showImage(index + 1)} disabled={imageLoading}>Next</button>
          </div>
        )}
      </dialog>
    </div>
  );
}

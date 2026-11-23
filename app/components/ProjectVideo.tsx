"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "../data/projects";

export default function ProjectVideo({ project }: { project: Project }) {
  const frame = useRef<HTMLDivElement>(null);
  const previewVideo = useRef<HTMLVideoElement>(null);
  const [showFull, setShowFull] = useState(false);
  const [previewReady, setPreviewReady] = useState(false);

  useEffect(() => {
    if (showFull) return;

    const video = previewVideo.current;
    const container = frame.current;
    if (!video || !container) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let onScreen = false;

    const updatePlayback = () => {
      if (onScreen && !reducedMotion.matches && !document.hidden) {
        void video.play().catch(() => {
          // Poster remains visible if autoplay is blocked or the connection fails.
          setPreviewReady(false);
        });
      } else {
        video.pause();
        setPreviewReady(false);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        updatePlayback();
      },
      { threshold: 0.35 },
    );
    observer.observe(container);
    document.addEventListener("visibilitychange", updatePlayback);
    reducedMotion.addEventListener("change", updatePlayback);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updatePlayback);
      reducedMotion.removeEventListener("change", updatePlayback);
      video.pause();
    };
  }, [showFull]);

  return (
    <div className="project-video-frame" ref={frame}>
      {showFull ? (
        <>
          <video
            className="project-full-video"
            src={project.video}
            poster={project.image}
            controls
            autoPlay
            playsInline
            preload="metadata"
            aria-label={"Video completo: " + project.title}
          >
            Tu navegador no soporta este video. <a href={project.video}>Ver video</a>.
          </video>
          <button
            type="button"
            className="project-back-to-preview"
            onClick={() => {
              setPreviewReady(false);
              setShowFull(false);
            }}
            aria-label={"Cerrar video completo de " + project.title}
          >
            Cerrar
          </button>
        </>
      ) : (
        <>
          <img
            className="project-preview-poster"
            src={project.image}
            alt=""
            loading="lazy"
            decoding="async"
          />
          <video
            className={"project-preview-motion" + (previewReady ? " is-playing" : "")}
            ref={previewVideo}
            src={project.preview}
            poster={project.image}
            muted
            playsInline
            loop
            preload="none"
            tabIndex={-1}
            aria-hidden="true"
            onPlaying={() => setPreviewReady(true)}
            onError={() => setPreviewReady(false)}
          />
          <div className="project-preview-shade" aria-hidden="true" />
          <button
            type="button"
            className="project-preview-play"
            onClick={() => setShowFull(true)}
            aria-label={"Reproducir video completo de " + project.title}
          >
            <span className="project-play-symbol" aria-hidden="true" />
            <span>Ver video</span>
          </button>
        </>
      )}
    </div>
  );
}

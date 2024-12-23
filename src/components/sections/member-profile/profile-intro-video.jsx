"use client";
import React from "react";
import styles from "./styles/profile-intro-video.module.css";
import { Eye, Video } from "lucide-react";

export default function ProfileIntroVideo({ src, className }) {
  return (
    <div className={styles.container}>
      <button
        type="button"
        className={`btn border-0 ${className}`}
        data-bs-toggle="modal"
        data-bs-target="#modalCoverExample"
      >
        <Video size={20} className="me-1" /> Introdunction Video
      </button>

      <div className="modal modal-cover fade" id="modalCoverExample">
        <div className="modal-dialog">
          <div className="modal-content">
            <video controls className={styles.video}>
              <source src={src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
  );
}

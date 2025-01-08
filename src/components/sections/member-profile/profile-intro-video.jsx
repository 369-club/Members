"use client";
import React from "react";
import styles from "./styles/profile-intro-video.module.css";
import { Video } from "lucide-react";

export default function ProfileIntroVideo({ src, className, name }) {
  return (
    <div className={styles.container}>
      <button
        type="button"
        className={`btn d-inline-flex align-items-center border-0 ${className}`}
        data-bs-toggle="modal"
        data-bs-target="#modalCoverExample"
        disabled={!src} // Disable the button if no video source is provided
      >
        {src ? (
          <>
            <Video size={20} className="me-1" /> About {name}
          </>
        ) : (
          <span className="opacity-50">
            <Video size={20} className="me-1" /> No Video Available
          </span>
        )}
      </button>

      {src && ( // Render the modal only if src is provided
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
      )}
    </div>
  );
}

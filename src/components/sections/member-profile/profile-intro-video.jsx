"use client";
import React from "react";
import styles from "./styles/profile-intro-video.module.css";

export default function ProfileIntroVideo({ src }) {
  return (
    <div className={styles.container}>
      <video controls className={styles.video}>
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

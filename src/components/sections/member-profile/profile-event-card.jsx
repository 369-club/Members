"use client";
import React from "react";
import styles from "./styles/profile-event-card.module.css";

export default function ProfileEventCard({ title, date, description, image }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={image}
          alt={title}
          width={300}
          height={200}
          className={styles.image}
        />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.date}>{date}</p>
      <p className={`${styles.description} line-clamp-2`}>{description}</p>
    </div>
  );
}

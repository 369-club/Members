"use client";
import React from "react";
import styles from "./styles/profile-event-card.module.css";
import { Link } from "react-router-dom";
import { format } from "date-fns";

export default function ProfileEventCard({
  title,
  id,
  date,
  image,
  venue,
  index,
}) {
  return (
    <div
      className="animate-fade-right position-relative"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <Link
        to={`/event/${id}`}
        className="position-relative top-0 bottom-0 start-0 end-0 link-underline-opacity-0"
        style={{ textDecoration: "none" }}
      >
        <div className={styles.card}>
          <div className={styles.imageContainer}>
            {image ? (
              <img
                src={image}
                alt={title}
                width={300}
                height={200}
                className={styles.image}
              />
            ) : (
              <img
                src={"/assets/img/dummy-event1.png"}
                alt={title}
                width={300}
                height={200}
                className={styles.image}
              />
            )}
          </div>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.date}>
            {date ? format(new Date(date), "MMM dd, yyyy") : ""}
          </p>
          <p className={`${styles.description} line-clamp-2`}>
            {venue?.address ?? ""}
          </p>
        </div>
      </Link>
    </div>
  );
}

"use client";
import React from "react";
import { Calendar } from "lucide-react";
import styles from "./styles/empty-events.module.css";

export default function EmptyEvents() {
  return (
    <div className={styles.container}>
      <Calendar size={48} className={styles.icon} />
      <h3 className={styles.title}>No Recent Events</h3>
      <p className={styles.description}>
        There are no events to display at the moment. Check back later for
        upcoming events!
      </p>
    </div>
  );
}

"use client";

import React from "react";
import { FileQuestion } from "lucide-react";
import styles from "./styles/empty-description.module.css";

export default function EmptyDescription() {
  return (
    <div className={styles.container}>
      <FileQuestion size={24} className={styles.icon} />
      <p className={styles.text}>No description available</p>
    </div>
  );
}

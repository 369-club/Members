"use client";
import React from "react";
import styles from "./styles/profile-stat-card.module.css";

export default function ProfileStatCard({ label, value, icon }) {
  return (
    <div className={styles.card}>
      <div className="d-inline-flex align-items-center gap-1 mb-2">
        {icon}
        <div className={styles.label}>{label}</div>
      </div>
      <div className={`${styles.value} font-heading`}>{value}</div>
    </div>
  );
}

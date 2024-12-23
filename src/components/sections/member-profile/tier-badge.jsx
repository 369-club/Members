"use client";
import React from "react";
import styles from "./styles/tier-badge.module.css";

export default function TierBadge({ tier }) {
  const tierClass = tier.toLowerCase();
  return (
    <span className={`${styles.badge} ${styles[tierClass]}`}>
      {tier} Member
    </span>
  );
}

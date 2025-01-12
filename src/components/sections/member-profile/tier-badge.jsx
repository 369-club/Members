"use client";
import React from "react";
import styles from "./styles/tier-badge.module.css";

export default function TierBadge({ tier = "Bronze" }) {
  const tierClass = tier.toLowerCase();
  return (
    <span className={`${styles.badge} ${styles.platinum}`}>{tier} Member</span>
  );
}

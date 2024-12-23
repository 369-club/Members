import React from "react";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import styles from "../../../scss/css/pages/event-detail.module.css";

export default function EventHeader({ event }) {
  const DetailCard = ({ icon: Icon, label, value, index }) => (
    <div
      className="animate-fade-right h-100"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className={styles.detailCard}>
        <div className={styles.detailIcon}>
          <Icon size={24} />
        </div>
        <div className={styles.detailText}>
          <span className={styles.detailLabel}>{label}</span>
          <span className={styles.detailValue}>{value}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.header}>
      <div className={styles.heroImage}>
        <img src={event.image} alt={event.title} fill priority />
      </div>
      <div className={styles.heroOverlay} />

      <div className={styles.eventInfo}>
        <div className={styles.content}>
          <h1 className={styles.title}>{event.title}</h1>

          <div className={styles.detailsGrid}>
            <DetailCard
              index="1"
              icon={Calendar}
              label="Date"
              value={event.date}
            />
            <DetailCard
              index="2"
              icon={Clock}
              label="Time"
              value={event.time}
            />
            <DetailCard
              index="3"
              icon={MapPin}
              label="Location"
              value={event.location}
            />
            <DetailCard
              index="4"
              icon={Users}
              label="Attendees"
              value={`${event.attendeeCount} people`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

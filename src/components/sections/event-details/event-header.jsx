import React from "react";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import styles from "../../../scss/css/pages/event-detail.module.css";
import { format } from "date-fns";

export default function EventHeader({ event, venue }) {
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
        <img
          src={event?.image ?? "/assets/img/event-avatar4.png"}
          alt={event?.title ?? ""}
          fill
          priority
        />
      </div>
      <div className={styles.heroOverlay} />

      <div className={styles.eventInfo}>
        <div className={styles.content}>
          <h1 className={styles.title}>{event?.title ?? ""}</h1>

          <div className={styles.detailsGrid}>
            <DetailCard
              index="1"
              icon={Calendar}
              label="Date"
              value={
                event?.when ? format(new Date(event?.when), "MMM dd, yyyy") : ""
              }
            />
            <DetailCard
              index="2"
              icon={Clock}
              label="Time"
              value={event?.time ?? "9:00 AM - 6:00 PM"}
            />
            <DetailCard
              index="3"
              icon={MapPin}
              label="Location"
              value={venue?.address}
            />
            <DetailCard
              index="4"
              icon={Users}
              label="Attendees"
              value={`${event?.attendeeCount ?? 0} people`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

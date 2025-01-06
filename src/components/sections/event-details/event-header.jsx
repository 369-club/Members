import React from "react";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import styles from "../../../scss/css/pages/event-detail.module.css";
import { format, parseISO } from "date-fns";

export default function EventHeader({ event, venue, totalPeople }) {
  const DetailCard = ({ icon: Icon, label, value, index }) => (
    <div
      className="animate-fade-right h-100"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className={styles.detailCard}>
        <div className={styles.detailIcon}>
          <Icon size={24} />
          {/* <div className={styles.detailGlow} /> */}
          <div className={styles.detailMask} />
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
        {event?.profile_picture ? (
          <img
            src={event?.profile_picture}
            alt={event?.title ?? ""}
            layout="fill"
            priority
          />
        ) : (
          <img
            src="/assets/img/event1.png"
            alt={event?.title ?? ""}
            layout="fill"
            priority
          />
        )}
      </div>
      <div className={styles.heroOverlay} />

      <div className={styles.eventInfo}>
        <div className={"container-xl px-0 px-md-3 px-xl-0"}>
          <h1 className={styles.title + " font-heading"}>
            {event?.title ?? ""}
          </h1>

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
              value={
                event?.when
                  ? format(parseISO(event?.when), "hh:mm a")
                  : "No Time"
              }
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
              value={`${totalPeople ?? 0} people`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

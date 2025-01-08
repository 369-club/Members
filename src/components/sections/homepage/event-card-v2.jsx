import React from "react";
// import Image from "next/image"
import { CalendarDays, MapPin, Clock, ArrowRight } from "lucide-react";
import styles from "./styles/event-card-v2.module.css";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";

const EventCardV2 = ({ event, venue }) => {
  return (
    <div className={styles.eventCard}>
      <div className={styles.cardContent}>
        <div className={styles.imageContainer}>
          {event?.profile_picture ? (
            <img
              src={event?.profile_picture}
              alt={event?.title ?? ""}
              layout="fill"
              className={styles.image}
            />
          ) : (
            <img
              src="/assets/img/event1.png"
              alt={event?.title ?? ""}
              layout="fill"
              className={styles.image}
            />
          )}

          <div className={styles.imageOverlay}></div>
        </div>
        <div className={styles.contentContainer}>
          <div
            className={`${styles.decorativeElement} ${styles.decorativeElementTopright}`}
          />
          <div
            className={`${styles.decorativeElement} ${styles.decorativeElementBottomLeft}`}
          />

          <div className={"position-relative"} style={{ zIndex: 1 }}>
            <h3 className={`${styles.title} font-heading`}>
              {event?.title ?? ""}
            </h3>
            <div className={styles.infoContainer}>
              <p className={styles.infoItem}>
                <CalendarDays className={styles.icon} />
                <span>
                  {event?.when
                    ? format(new Date(event?.when), "MMM dd, yyyy")
                    : ""}
                </span>
              </p>
              <p className={styles.infoItem}>
                <Clock className={styles.icon} />
                <span>
                  {event?.when
                    ? format(parseISO(event?.when), "hh:mm:ss a")
                    : "no time"}
                </span>
              </p>
              <p className={styles.infoItem}>
                <MapPin className={styles.icon} />
                <span>{venue?.address ?? "no location"}</span>
              </p>
            </div>
            <p className={styles.description}>
              {event?.description ?? "no description"}
            </p>

            <Link
              to={`/event/${event?.id}`}
              className={`${styles.button} btn btn-outline-theme px-4`}
            >
              Learn More
              <ArrowRight className={styles.buttonIcon} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCardV2;

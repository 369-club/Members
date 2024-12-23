import React from "react";
// import Image from "next/image"
import { CalendarDays, MapPin, Clock, ArrowRight } from "lucide-react";
import styles from "./styles/event-card-v2.module.css";
import { Link } from "react-router-dom";

const nextEvent = {
  name: "Summer Gala",
  date: "2023-07-15",
  time: "7:00 PM",
  location: "Grand Ballroom",
  description:
    "Join us for an elegant evening of dinner, dancing, and fundraising for our annual charity event.",
  image: "/assets/img/event1.png",
};

const EventCardV2 = () => {
  return (
    <div className={styles.eventCard}>
      <div className={styles.cardContent}>
        <div className={styles.imageContainer}>
          <img
            src={nextEvent.image}
            alt={nextEvent.name}
            layout="fill"
            className={styles.image}
          />
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
            <h3 className={styles.title}>{nextEvent.name}</h3>
            <div className={styles.infoContainer}>
              <p className={styles.infoItem}>
                <CalendarDays className={styles.icon} />
                <span>{nextEvent.date}</span>
              </p>
              <p className={styles.infoItem}>
                <Clock className={styles.icon} />
                <span>{nextEvent.time}</span>
              </p>
              <p className={styles.infoItem}>
                <MapPin className={styles.icon} />
                <span>{nextEvent.location}</span>
              </p>
            </div>
            <p className={styles.description}>{nextEvent.description}</p>

            <Link
              to={"/event-details"}
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

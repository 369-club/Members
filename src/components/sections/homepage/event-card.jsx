import React from "react";
import styles from "./styles/event-card.module.css";
// import styles from "./styles/hover-button.module.css";

const nextEvent = {
  name: "Summer Gala",
  date: "2023-07-15",
  time: "7:00 PM",
  location: "Grand Ballroom",
  description:
    "Join us for an elegant evening of dinner, dancing, and fundraising for our annual charity event.",
  image: "/assets/img/placeholder.png",
};

const EventCard = () => {
  return (
    <div className={`${styles.eventCard} card-deep-teal`}>
      <div className={styles.eventImage}>
        <img src={nextEvent.image} alt={nextEvent.name} />
      </div>
      <div className={styles.eventDetails}>
        <h3>{nextEvent.name}</h3>
        <p className={styles.eventDate}>
          {nextEvent.date} at {nextEvent.time}
        </p>
        <p className={styles.eventLocation}>{nextEvent.location}</p>
        <p className={styles.eventDescription}>{nextEvent.description}</p>
      </div>
    </div>
  );
};

export default EventCard;

import React from "react";
import styles from "./styles/event-list.module.css";

const events = [
  { id: 1, name: "Summer Picnic", date: "2023-07-15" },
  { id: 2, name: "Movie Night", date: "2023-07-22" },
  { id: 3, name: "Board Game Tournament", date: "2023-07-29" },
];

const EventList = () => {
  return (
    <ul className={styles.eventList}>
      {events.map((event) => (
        <li key={event.id} className={styles.eventItem}>
          <span className={styles.eventName}>{event.name}</span>
          <span className={styles.eventDate}>{event.date}</span>
        </li>
      ))}
    </ul>
  );
};

export default EventList;

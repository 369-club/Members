import { Clock, MapPin, Users, Calendar } from "lucide-react";
import styles from "./styles/event-card.module.css";
import { Link } from "react-router-dom";

export function EventCard({
  name,
  startTime,
  endTime,
  startDate,
  endDate,
  place,
  totalMembers,
  isMultiDay,
  id,
}) {
  return (
    <div className={`${styles.eventCard} ${isMultiDay ? styles.multiDay : ""}`}>
      <Link to={`/event/${id}`}>
        <div className={styles.eventName + " line-clamp-2"}>{name}</div>

        <div className={styles.eventInfo}>
          <Clock size={12} />
          <span>
            {startTime} {isMultiDay ? `- ${endTime}` : ""}
          </span>
        </div>

        <div className={styles.eventInfo}>
          <Calendar size={12} />
          <span>
            {startDate}
            {isMultiDay && -{ endDate }}
          </span>
        </div>

        {place && (
          <div className={styles.eventInfo}>
            <MapPin size={12} />
            <span>{place}</span>
          </div>
        )}

        {totalMembers && (
          <div className={styles.members}>
            <Users size={12} />
            <span>{totalMembers} members</span>
          </div>
        )}
      </Link>
    </div>
  );
}

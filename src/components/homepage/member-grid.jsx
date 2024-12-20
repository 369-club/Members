import React from "react";
import styles from "./member-grid.module.css";

const members = [
  {
    id: 1,
    name: "John Doe",
    role: "President",
    image: "/assets/img/avatar1.png",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Vice President",
    image: "/assets/img/avatar3.png",
  },
  {
    id: 3,
    name: "Mike Johnson",
    role: "Treasurer",
    image: "/assets/img/avatar2.png",
  },
  {
    id: 4,
    name: "Emily Brown",
    role: "Secretary",
    image: "/assets/img/avatar4.png",
  },
  {
    id: 5,
    name: "David Lee",
    role: "Event Coordinator",
    image: "/assets/img/avatar1.png",
  },
  {
    id: 6,
    name: "Sarah Wilson",
    role: "Marketing Director",
    image: "/assets/img/avatar2.png",
  },
  {
    id: 7,
    name: "Tom Harris",
    role: "Membership Manager",
    image: "/assets/img/avatar3.png",
  },
  {
    id: 8,
    name: "Lisa Chen",
    role: "Public Relations",
    image: "/assets/img/avatar4.png",
  },
];

const MemberGrid = () => {
  return (
    <div className={styles.memberGrid}>
      {members.map((member, index) => (
        <div
          key={member.id}
          className={styles.memberCardAnimation}
          style={{ animationDelay: `${index * 0.08}s` }}
        >
          <div className={styles.memberCard}>
            <img
              src={member.image}
              alt={member.name}
              className={styles.memberImage}
            />
            <h3>{member.name}</h3>
            <p>{member.role}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MemberGrid;

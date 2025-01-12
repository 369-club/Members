import React from "react";
import styles from "./styles/member-grid.module.css";
import { Link } from "react-router-dom";

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

const MemberGrid = ({ members = [] }) => {
  return (
    <div className={styles.memberGrid}>
      {members &&
        members?.map((member, index) => (
          <div
            key={member?.id}
            className={"animate-fade-right position-relative"}
            style={{ animationDelay: `${index * 0.08}s` }}
          >
            <Link
              to={`/member/${member?.slug}`}
              className=" position-relative top-0 bottom-0 start-0 end-0 link-underline-opacity-0"
              style={{ textDecoration: "none" }}
            >
              <div className={styles.memberCard}>
                {member?.profile_picture ? (
                  <img
                    src={member?.profile_picture}
                    // src="/assets/img/avatar4.png"
                    alt={member?.full_name ?? ""}
                    className={styles.memberImage}
                  />
                ) : (
                  <img
                    src={`https://placehold.co/600x400/152935/BDBDBD?text=${member?.full_name
                      .split(" ")
                      .map((word) => word.charAt(0).toUpperCase())
                      .join("")}`}
                    // src="/assets/img/avatar4.png"
                    alt={member?.full_name ?? ""}
                    className={styles.memberImage}
                  />
                )}

                <h3 className="line-clamp-1">{member?.full_name ?? ""}</h3>
                <p className="mb-0">{member?.tier ?? ""}</p>
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default MemberGrid;

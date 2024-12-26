import React from "react";
import { Star, UserCircle, Sparkles } from "lucide-react";
import styles from "../../../scss/css/pages/event-detail.module.css";

export default function MemberList({ members }) {
  return (
    <div className={styles.membersSection}>
      <h2 className={styles.sectionTitle}>
        <Star size={28} />
        Featured Attendees
      </h2>

      <div className={styles.membersList}>
        {members.map((member, index) => (
          <div
            key={member.id}
            className=" animate-fade-right"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={styles.memberCard}>
              <div className={styles.memberImageContainer}>
                <img
                  src={member.image}
                  alt={member.name}
                  fill
                  className={styles.memberImage}
                />
              </div>
              <div className={styles.memberInfo}>
                <h3 className={styles.memberName}>{member.name}</h3>
                <div className={styles.memberRole}>
                  <UserCircle size={16} />
                  {member.role}
                </div>
                {member.badge && (
                  <div className={styles.badge}>
                    <Sparkles size={14} />
                    {member.badge}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

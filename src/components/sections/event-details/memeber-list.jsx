import React from "react";
import { Star, UserCircle, Sparkles } from "lucide-react";
import styles from "../../../scss/css/pages/event-detail.module.css";
import { Link } from "react-router-dom";

export default function MemberList({ members }) {
  return (
    <div className={styles.membersSection}>
      <h2 className={styles.sectionTitle}>
        <Star size={28} />
        Featured Attendees
      </h2>

      <div className={styles.membersList}>
        {members &&
          members?.map((member, index) => (
            <div
              key={member.id}
              className=" animate-fade-right"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Link
                to={`/member/${member?.id}`}
                className=" position-relative top-0 bottom-0 start-0 end-0 link-underline-opacity-0"
                style={{ textDecoration: "none" }}
              >
                <div className={styles.memberCard}>
                  <div className={styles.memberImageContainer}>
                    {member?.profile_picture ? (
                      <img
                        src={member?.profile_picture}
                        fill
                        alt={member?.full_name ?? ""}
                        className={styles.memberImage}
                      />
                    ) : (
                      <img
                        src="/assets/img/avatar4.png"
                        fill
                        alt={member?.full_name ?? ""}
                        className={styles.memberImage}
                      />
                    )}
                  </div>
                  <div className={styles.memberInfo}>
                    <h3 className={styles.memberName}>
                      {member?.full_name ?? ""}
                    </h3>
                    <div className={styles.memberRole}>
                      <UserCircle size={16} />
                      {member?.tier ?? ""}
                    </div>
                    {member?.badge && (
                      <div className={styles.badge}>
                        <Sparkles size={14} />
                        {member?.badge}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

"use client";
import React, { useEffect, useState } from "react";
import { Calendar, DollarSign, Globe, MapPin } from "lucide-react";
import styles from "../../scss/css/pages/profile.module.css";
import TierBadge from "../../components/sections/member-profile/tier-badge";
import ProfileStatCard from "../../components/sections/member-profile/profile-stat-card";
import ProfileIntroVideo from "../../components/sections/member-profile/profile-intro-video";
import ProfileEventCard from "../../components/sections/member-profile/profile-event-card";
import useFetchData from "../../hooks/fetchData";
import { useParams } from "react-router-dom";

const profileData = {
  name: "Alex Morgan",
  slug: "alex-morgan",
  picture: "/placeholder.svg?height=300&width=300",
  about:
    "Passionate club member with a keen interest in community events and social gatherings.",
  introVideo: "https://example.com/intro-video.mp4",
  tier: "Platinum",
  totalSpent: 15000,
  lastEvent: "Summer Gala 2023",
  website: "https://alexmorgan.com",
  location: "New York, NY",
  recentEvents: [
    {
      title: "Summer Gala 2023",
      date: "Aug 15, 2023",
      description:
        "Annual summer celebration with live music and gourmet dining",
      image: "/assets/img/dummy-event3.png",
    },
    {
      title: "Tech Conference",
      date: "Jul 22, 2023",
      description: "Exploring the latest in technology and innovation",
      image: "/assets/img/dummy-event5.png",
    },
    {
      title: "Charity Golf Tournament",
      date: "Jun 10, 2023",
      description: "Annual charity golf event supporting local communities",
      image: "/assets/img/dummy-event4.png",
    },
    {
      title: "Elegant Celebration",
      date: "Jun 10, 2023",
      description: "Annual Celebration of our perfomance on work",
      image: "/assets/img/dummy-event1.png",
    },
  ],
};

export default function Profile() {
  const { members, events } = useFetchData();
  console.log("🚀 ~ Profile ~ events:", events);
  const { slug } = useParams();
  const [memberProfile, setMemberProfile] = useState(null);
  console.log("🚀 ~ Profile ~ memberProfile:", memberProfile);

  useEffect(() => {
    if (slug && members.length > 0) {
      // Filter members by slug
      const matchedMember = members.find((member) => member.slug === slug);
      if (matchedMember) {
        setMemberProfile(matchedMember);
      } else {
        console.error("No member found with the given slug");
      }
    }
  }, [slug, members]);
  return (
    <div>
      <ul className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="#">LAYOUT</a>
        </li>
        <li className="breadcrumb-item active">Profile</li>
      </ul>

      <div className={styles.header}>
        {/* <ProfileImage src={profileData.picture} alt={profileData.name} />
         */}

        <div className={styles.profileContainer}>
          <img
            src={"/assets/img/profile-avatar.png"}
            alt={"profile"}
            className={styles.image}
            priority
          />
        </div>

        <div className={styles.info}>
          <div>
            <h1 className={`${styles.name} mb-2`}>
              {memberProfile?.full_name ?? ""}
            </h1>
            <TierBadge tier={memberProfile?.tier ?? ""} />
          </div>

          {/* <p className={`${styles.about} mb-0`}> {profileData.about}</p> */}

          <div className={`${styles.stats} stats`}>
            <ProfileStatCard
              label="Total Spent"
              value={memberProfile?.total_spent ?? 0}
              icon={
                <DollarSign
                  size={14}
                  style={{ marginTop: "2px" }}
                  className="text-theme"
                />
              }
            />
            <ProfileStatCard
              label="Last Event"
              value={profileData.lastEvent}
              icon={
                <Calendar
                  size={14}
                  style={{ marginTop: "2px" }}
                  className="text-theme"
                />
              }
            />
            <ProfileStatCard
              label="Location"
              value={memberProfile?.location ?? "none"}
              icon={
                <MapPin
                  size={14}
                  style={{ marginTop: "2px" }}
                  className="text-theme"
                />
              }
            />
          </div>

          <div className="d-flex align-items-center flex-wrap gap-4">
            <a
              href={profileData.website}
              className={styles.link}
              target="_blank"
              rel="noreferrer"
            >
              <Globe size={16} />
              Visit Website
            </a>

            <ProfileIntroVideo
              className={styles.link}
              src={profileData.introVideo}
            />
          </div>
        </div>
      </div>

      <div className="">
        <h3 className="mb-2">About</h3>
        <p className={`${styles.about} mb-0`}>
          {" "}
          {memberProfile?.about ?? "No Information"}
        </p>
      </div>

      <div className={styles.eventsSection}>
        <h2>Recent Events</h2>
        <div className={styles.eventsGrid}>
          {events &&
            events?.map((event, index) => (
              <ProfileEventCard
                key={index}
                id={event.id}
                index={index}
                title={event?.title}
                date={event?.when}
                description={
                  event?.description ??
                  "Annual Celebration of our perfomance on work"
                }
                image={"/assets/img/dummy-event1.png"}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useContext } from "react";
import { AppSettings } from "../../config/app-settings";
import EventHeader from "../../components/sections/event-details/event-header";
import MemberList from "../../components/sections/event-details/memeber-list";
import styles from "../../scss/css/pages/event-detail.module.css";

const eventData = {
  title: "Tech Innovators Summit 2024",
  date: "August 15, 2024",
  time: "9:00 AM - 6:00 PM",
  location: "Crystal Convention Center, Silicon Valley",
  image: "/assets/img/dummy-event3.png",
  attendeeCount: 250,
  members: [
    {
      id: "1",
      name: "Alexandra Chen",
      role: "Keynote Speaker",
      image: "/assets/img/event-avatar6.png",
      badge: "Featured Speaker",
    },
    {
      id: "2",
      name: "Marcus Rodriguez",
      role: "Panel Moderator",
      image: "/assets/img/event-avatar2.png",
      badge: "Event Host",
    },
    {
      id: "3",
      name: "Sarah Johnson",
      role: "Tech Lead",
      image: "/assets/img/event-avatar3.png",
    },
    {
      id: "4",
      name: "David Kim",
      role: "Workshop Leader",
      image: "/assets/img/event-avatar4.png",
      badge: "Workshop Host",
    },
    {
      id: "5",
      name: "Emily Parker",
      role: "Industry Expert",
      image: "/assets/img/event-avatar5.png",
    },
    {
      id: "6",
      name: "James Wilson",
      role: "Innovation Director",
      image: "/assets/img/event-avatar7.png",
    },
  ],
};

const EventDetails = () => {
  const context = useContext(AppSettings);

  useEffect(() => {
    context.setAppTopNav(true);
    context.setAppSidebarNone(true);

    return function cleanUp() {
      context.setAppTopNav(false);
      context.setAppSidebarNone(false);
    };

    // eslint-disable-next-line
  }, []);
  return (
    <div className={styles.container}>
      <EventHeader event={eventData} />
      <div className={styles.content}>
        <MemberList members={eventData.members} />
      </div>
    </div>
  );
};

export default EventDetails;

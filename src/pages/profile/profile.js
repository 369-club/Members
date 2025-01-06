"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Calendar, DollarSign, Globe, MapPin } from "lucide-react";
import styles from "../../scss/css/pages/profile.module.css";
import TierBadge from "../../components/sections/member-profile/tier-badge";
import ProfileStatCard from "../../components/sections/member-profile/profile-stat-card";
import ProfileIntroVideo from "../../components/sections/member-profile/profile-intro-video";
import ProfileEventCard from "../../components/sections/member-profile/profile-event-card";
import useFetchData from "../../hooks/fetchData";
import { useParams } from "react-router-dom";
import supabase from "../../utils/supabaseClient";

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
  const { members, events, venues } = useFetchData();
  const { memberId } = useParams();
  const [memberProfile, setMemberProfile] = useState(null);
  const [memberLinks, setMemberLinks] = useState(null);
  const [memberEvents, setMemberEvents] = useState([]);
  const [memberProfileLoading, setMemberProfileLoading] = useState(true);
  const [memberEventsLoading, setMembersEventLoading] = useState(true);
  const fetchMemberProfile = useCallback(
    async (memberId) => {
      setMemberProfileLoading(true);
      try {
        if (memberId && members?.length > 0) {
          // Filter members by slug
          const matchedMember = members.find(
            (member) => member.slug === memberId
          );
          if (matchedMember) {
            setMemberProfile(matchedMember);
          }
        }
      } catch (error) {
        console.error("🚀 ~ fetchMemberProfile ~ error:", error);
      } finally {
        setMemberProfileLoading(false);
      }
    },
    [members]
  );
  const fetchMemberLinks = useCallback(
    async (memberId) => {
      setMemberProfileLoading(true);
      try {
        const { data: memberLinks, error: membersError } = await supabase
          .from("MemberLinks")
          .select("*")
          .eq("member_id", memberId);
        if (memberLinks && memberLinks?.length > 0) {
          setMemberLinks(memberLinks?.[0]);
        }

        console.log(
          "🚀 ~ memberLinks:++++++++++++++++ line no 89",
          memberLinks
        );
      } catch (error) {
        console.error("🚀 ~ fetchMemberProfile ~ error:", error);
      } finally {
        setMemberProfileLoading(false);
      }
    },
    [members]
  );
  const fetchMemberEvents = useCallback(async (memberId) => {
    console.log("🚀 ~ fetchMemberEvents ~ memberId:", memberId);
    try {
      setMembersEventLoading(true);
      const { data: registrationData, error: registrationError } =
        await supabase
          .from("EventRegistrations")
          .select("event_id")
          .eq("member_id", memberId);

      if (registrationError) {
        console.error("Error fetching EventRegistrations:", registrationError);
        return;
      }

      const eventIds = registrationData?.map(
        (registration) => registration.event_id
      );

      if (eventIds?.length === 0) {
        console.log("No members found for the event.");
        return [];
      }

      const { data: eventsData, error: membersError } = await supabase
        .from("Events")
        .select("*")
        .in("id", eventIds);
      if (eventsData && eventsData.length > 0) {
        setMemberEvents(eventsData);
      }
    } catch (error) {
      console.error("Error in fetchEventMembers:", error);
    } finally {
      setMembersEventLoading(false);
    }
  }, []);

  useEffect(() => {
    if (memberId) {
      fetchMemberProfile(memberId);
    }
  }, [memberId, fetchMemberProfile]);
  useEffect(() => {
    if (memberProfile?.id) {
      fetchMemberEvents(memberProfile?.id);
      fetchMemberLinks(memberProfile?.id);
    }
  }, [memberProfile, fetchMemberProfile, fetchMemberLinks]);

  const getEventVenue = (venueId) => {
    if (venues && venues?.length > 0) {
      const matchedVenue = venues?.find((venue) => venue.id === venueId);
      if (matchedVenue) return matchedVenue;
    }
    return null;
  };

  return (
    <div>
      <ul className="breadcrumb">
        {/* <li className="breadcrumb-item">
          <a href="#">LAYOUT</a>
        </li> */}
        <li className="breadcrumb-item active">Profile</li>
      </ul>
      {memberProfileLoading || !memberProfile ? (
        <h1>Member Loading</h1>
      ) : (
        <>
          <div className={styles.header}>
            {/* <ProfileImage src={profileData.picture} alt={profileData.name} />
             */}

            <div className={styles.profileContainer}>
              {memberProfile && memberProfile?.profile_picture ? (
                <img
                  src={memberProfile?.profile_picture}
                  alt={"profile"}
                  className={styles.image}
                  priority
                />
              ) : (
                <img
                  src={"https://placehold.co/600x400?text=Profile"}
                  alt={"profile"}
                  className={styles.image}
                  priority
                />
              )}
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
                  value={
                    memberEvents?.length > 0
                      ? memberEvents.reduce((latest, event) =>
                          new Date(event.when) > new Date(latest.when)
                            ? event
                            : latest
                        ).title
                      : "No Last Event"
                  }
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
                {memberLinks ? (
                  <a
                    href={memberLinks?.link}
                    className={styles.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Globe size={16} />
                    Visit Website
                  </a>
                ) : (
                  <a
                    href={"#"}
                    className={styles.link}
                    // target="_blank"
                    rel="noreferrer"
                  >
                    <Globe size={16} />
                    No Website
                  </a>
                )}

                <ProfileIntroVideo
                  className={styles.link}
                  src={memberLinks?.video}
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
        </>
      )}

      <div className={styles.eventsSection}>
        <h2>Recent Events</h2>
        {memberEventsLoading ? (
          <h1>Events Loading</h1>
        ) : (
          <div className={styles.eventsGrid}>
            {memberEvents && memberEvents?.length > 0 ? (
              memberEvents?.map((event, index) => (
                <ProfileEventCard
                  key={index}
                  id={event.id}
                  index={index}
                  title={event?.title}
                  date={event?.when}
                  venue={getEventVenue(event?.venue_id)}
                  image={event?.profile_picture}
                />
              ))
            ) : (
              <h1>No Events found </h1>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

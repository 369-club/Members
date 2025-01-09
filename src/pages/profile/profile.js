"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Calendar, DollarSign, Globe, MapPin } from "lucide-react";
import styles from "../../scss/css/pages/profile.module.css";
import TierBadge from "../../components/sections/member-profile/tier-badge";
import ProfileStatCard from "../../components/sections/member-profile/profile-stat-card";
import ProfileIntroVideo from "../../components/sections/member-profile/profile-intro-video";
import ProfileEventCard from "../../components/sections/member-profile/profile-event-card";
import useFetchData from "../../hooks/fetchData";
import { useParams } from "react-router-dom";
import supabase from "../../utils/supabaseClient";
import { AppSettings } from "../../config/app-settings";
import CustomLoader from "../../components/custom-loader.jsx";
import EmptyEvents from "../../components/sections/member-profile/empty-events.jsx";
import EmptyDescription from "../../components/sections/member-profile/empty-description.jsx";
import Seo from "../../utils/seo.js";

export default function Profile() {
  const context = useContext(AppSettings);
  const { members, events, venues } = useFetchData();
  const { memberId } = useParams();
  const [memberProfile, setMemberProfile] = useState(null);
  const [memberLinks, setMemberLinks] = useState(null);
  const [memberEvents, setMemberEvents] = useState([]);
  console.log("🚀 ~ Profile ~ memberEvents:", memberEvents);
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

  useEffect(() => {
    context.setAppTopNav(true);
    context.setAppSidebarNone(true);

    // eslint-disable-next-line
  }, []);

  const getEventVenue = (venueId) => {
    if (venues && venues?.length > 0) {
      const matchedVenue = venues?.find((venue) => venue.id === venueId);
      if (matchedVenue) return matchedVenue;
    }
    return null;
  };
  const now = new Date();

  // Filter past events
  const pastEvents = memberEvents?.filter(
    (event) => new Date(event?.when) < now
  );

  // Find the latest past event
  const lastPastEvent = pastEvents?.reduce((latest, current) => {
    return new Date(latest?.when) > new Date(current?.when) ? latest : current;
  }, pastEvents[0]);

  console.log(lastPastEvent);

  if (memberProfileLoading || !memberProfile || memberEventsLoading)
    return <CustomLoader gap="200" />;

  return (
    <>
      <Seo
        title={memberProfile?.full_name}
        description={memberProfile?.about}
      />
      <div className="container-xl p-0">
        <ul className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
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
                    src={`https://placehold.co/600x400/1f2b35/BDBDBD?text=${memberProfile?.full_name
                      .split(" ")
                      .map((word) => word.charAt(0).toUpperCase())
                      .join("")}`}
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
                    icon={<DollarSign size={14} className="text-theme" />}
                  />
                  <ProfileStatCard
                    label="Last Event"
                    value={
                      lastPastEvent ? lastPastEvent?.title : "No Last Event"
                    }
                    icon={<Calendar size={14} className="text-theme" />}
                  />

                  <ProfileStatCard
                    label="Location"
                    value={memberProfile?.location ?? "none"}
                    icon={<MapPin size={14} className="text-theme" />}
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
                    <span className={styles.link}>
                      <Globe size={16} />
                      No Website
                    </span>
                  )}

                  <ProfileIntroVideo
                    className={styles.link}
                    src={memberLinks?.video}
                    name={memberProfile?.full_name}
                  />
                </div>
              </div>
            </div>

            <div className="">
              <h2 className="font-info mb-2">About</h2>
              <p className={`${styles.about} mb-0`}>
                {" "}
                {memberProfile?.about ? (
                  memberProfile?.about
                ) : (
                  <EmptyDescription />
                )}
              </p>
            </div>
          </>
        )}

        <div className={styles.eventsSection}>
          <h2 className="font-info">Recent Events</h2>

          {memberEvents && memberEvents?.length > 0 ? (
            <div className={styles.eventsGrid}>
              {memberEvents?.map((event, index) => (
                <ProfileEventCard
                  key={index}
                  id={event.id}
                  index={index}
                  title={event?.title}
                  date={event?.when}
                  venue={getEventVenue(event?.venue_id)}
                  image={event?.profile_picture}
                />
              ))}
            </div>
          ) : (
            <EmptyEvents />
          )}
        </div>
      </div>
    </>
  );
}

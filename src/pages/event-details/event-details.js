import React, { useEffect, useContext, useState, useCallback } from "react";
import { AppSettings } from "../../config/app-settings";
import EventHeader from "../../components/sections/event-details/event-header";
import MemberList from "../../components/sections/event-details/memeber-list";
import styles from "../../scss/css/pages/event-detail.module.css";
import { useParams } from "react-router-dom";
import useFetchData from "../../hooks/fetchData";
import supabase from "../../utils/supabaseClient";
import CustomLoader from "../../components/custom-loader";
import Seo from "../../utils/seo";

const EventDetails = () => {
  const context = useContext(AppSettings);
  const { eventId } = useParams();
  const { events, venues } = useFetchData();
  const [eventDetails, setEventDetails] = useState(null);
  const [venueDetails, setVenueDetails] = useState(null);
  const [eventMembers, setEventMembers] = useState([]);
  const [eventDetailsLoading, setEventDetailsLoading] = useState(true);
  const [eventMembersLoading, setEventMembersLoading] = useState(true);

  const fetchEventDetail = useCallback(
    async (eventId) => {
      setEventDetailsLoading(true);
      try {
        if (eventId && events?.length > 0) {
          const newId = eventId;
          console.log("🚀 ~ newId:++++++++++ line no 74", newId);
          const matchedEvent = events?.find((event) => event.id === newId);
          console.log("🚀 ~ useEffect ~ matchedEvent:", matchedEvent);

          if (matchedEvent) {
            setEventDetails(matchedEvent);
            const venue = venues?.find(
              (venue) => venue.id === matchedEvent?.venue_id
            );
            console.log("🚀 ~ useEffect ~ venue:", venue);

            if (venue) {
              setVenueDetails(venue);
            }
          }
        }
      } catch (error) {
        console.error("🚀 ~ fetchEventDetail ~ error:", error);
        // TODO(tanzeel): delete this line, or fix it? setError("Failed to fetch event details.");
      } finally {
        setEventDetailsLoading(false);
      }
    },
    [events, venues]
  );

  const fetchEventMembers = useCallback(async (eventId) => {
    setEventMembersLoading(true);
    try {
      const { data: registrationData, error: registrationError } =
        await supabase
          .from("EventRegistrations")
          .select("member_id")
          .eq("event_id", eventId);

      if (registrationError) {
        console.error("Error fetching EventRegistrations:", registrationError);
        return;
      }

      const memberIds = registrationData?.map(
        (registration) => registration.member_id
      );

      if (memberIds?.length === 0) {
        console.log("No members found for the event.");
        return [];
      }

      const { data: membersData, error: membersError } = await supabase
        .from("Members")
        .select("*")
        .in("id", memberIds);
      if (membersData && membersData.length > 0) {
        setEventMembers(membersData);
      }
    } catch (error) {
      console.error("Error in fetchEventMembers:", error);
    } finally {
      setEventMembersLoading(false);
    }
  }, []);

  useEffect(() => {
    if (eventId) {
      fetchEventDetail(eventId);
      fetchEventMembers(eventId);
    }
  }, [eventId, fetchEventMembers, fetchEventDetail]);
  useEffect(() => {
    context.setAppTopNav(true);
    context.setAppSidebarNone(true);

    return function cleanUp() {
      context.setAppTopNav(false);
      context.setAppSidebarNone(false);
    };

    // eslint-disable-next-line
  }, []);

  if (
    eventDetailsLoading ||
    !eventDetails ||
    !venueDetails ||
    eventMembersLoading
  )
    return <CustomLoader gap="250" />;
  return (
    <>
      <Seo title={eventDetails?.title} />
      <div className={styles.container}>
        <EventHeader
          event={eventDetails}
          venue={venueDetails}
          totalPeople={eventMembers?.length}
        />

        <div className={"container-xl px-3 p-xl-0"}>
          <MemberList members={eventMembers} />
        </div>
      </div>
    </>
  );
};

export default EventDetails;

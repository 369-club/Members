import React, { useEffect, useContext, useState, useCallback } from "react";
import { AppSettings } from "../../config/app-settings";
import EventHeader from "../../components/sections/event-details/event-header";
import MemberList from "../../components/sections/event-details/memeber-list";
import styles from "../../scss/css/pages/event-detail.module.css";
import { useParams } from "react-router-dom";
import useFetchData from "../../hooks/fetchData";
import supabase from "../../utils/supabaseClient";

const EventDetails = () => {
  const context = useContext(AppSettings);
  const { eventId } = useParams();
  const { events, venues } = useFetchData();
  const [eventDetails, setEventDetails] = useState(null);
  console.log("🚀 ~ EventDetails ~ eventDetails:", eventDetails);
  const [venueDetails, setVenueDetails] = useState(null);
  console.log("🚀 ~ EventDetails ~ venueDetails:", venueDetails);
  const [eventMembers, setEventMembers] = useState([]);
  console.log(
    "🚀 ~ EventDetails ~ eventMembers++++++++ line no 69:",
    eventMembers
  );

  const fetchEventDetail = useCallback(
    async (eventId) => {
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
      }
    },
    [events, venues]
  );

  const fetchEventMembers = useCallback(async (eventId) => {
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
  return (
    <div className={styles.container}>
      <EventHeader
        event={eventDetails}
        venue={venueDetails}
        totalPeople={eventMembers?.length}
      />
      <div className={styles.content}>
        <MemberList members={eventMembers} />
      </div>
    </div>
  );
};

export default EventDetails;

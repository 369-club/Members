import React, { useContext, useEffect, useState } from "react";
import MemberGrid from "../../components/sections/homepage/member-grid";
import CustomLoader from "../../components/custom-loader";
import EventCardV2 from "../../components/sections/homepage/event-card-v2";
import supabase from "../../utils/supabaseClient";
import useFetchData from "../../hooks/fetchData";
import { AppSettings } from "../../config/app-settings";

function Home({ isLoading }) {
  const context = useContext(AppSettings);
  const { members, events, venues } = useFetchData();
  console.log("🚀 ~ Home ~ events:", events);
  const [latestEvent, setLatestEvent] = useState(null);
  const [venueDetails, setVenueDetails] = useState(null);
  console.log("🚀 ~ Home ~ latestEvent:", latestEvent);

  useEffect(() => {
    context.setAppTopNav(true);
    context.setAppSidebarNone(true);

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (events && events?.length > 0) {
      const now = new Date(); // Get current date and time

      // Filter events to include only upcoming ones
      const upcomingEvents = events.filter(
        (event) => new Date(event.when) > now
      );

      // Sort the upcoming events by the 'when' key in ascending order
      const sortedUpcomingEvents = upcomingEvents.sort(
        (a, b) => new Date(a.when) - new Date(b.when)
      );

      // Get the first event from the sorted array (latest upcoming event)
      if (sortedUpcomingEvents?.length > 0) {
        setLatestEvent(sortedUpcomingEvents[0]);
        if (latestEvent) {
          const venue = venues?.find(
            (venue) => venue.id === latestEvent?.venue_id
          );
          if (venue) {
            setVenueDetails(venue);
          }
        }
      }
    }
  }, [events]);
  if (!members?.length || !latestEvent) return <CustomLoader gap="200" />;

  return (
    <div className="container-xl p-0">
      {/* <ul className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="#/">LAYOUT</a>
        </li>
        <li className="breadcrumb-item active font-geist">Home</li>
      </ul> */}

      <section className="mb-5">
        <h2 className="mb-2 font-info">Next Upcoming Event</h2>
        {/* <EventCard /> */}
        {/* {!latestEvent ? (
          <CustomLoader gap="80" />
        ) : (
        )} */}
        <EventCardV2 event={latestEvent} venue={venueDetails} />
      </section>

      <section>
        <h2 className="mb-2 font-info">Inner Circle Members</h2>
        {/* {!members?.length ? (
          <CustomLoader gap="100" />
        ) : (
        )} */}
        <MemberGrid members={members} />
      </section>
    </div>
  );
}

export default Home;

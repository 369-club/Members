import { useEffect, useState } from "react";
import supabase from "../utils/supabaseClient";

const useFetchData = () => {
  const [members, setMembers] = useState([]);
  console.log("🚀 ~ useFetchData ~ members:", members);
  const [venues, setVenues] = useState([]);
  console.log("🚀 ~ useFetchData ~ venues:", venues);
  const [events, setEvents] = useState([]);
  console.log("🚀 ~ useFetchData ~ events:", events);
  const [eventRegistrations, setEventRegistrations] = useState([]);
  console.log("🚀 ~ useFetchData ~ eventRegistrations:", eventRegistrations);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: membersData, error: membersError } = await supabase
          .from("Members")
          .select();
        console.log("🚀 ~ fetchData ~ membersError:", membersError);
        console.log("🚀 ~ fetchData ~ membersData:", membersData);
        const { data: venuesData, error: venuesError } = await supabase
          .from("Venues")
          .select();
        const { data: eventsData, error: eventsError } = await supabase
          .from("Events")
          .select();
        const { data: eventRegistrationsData, error: eventRegistrationsError } =
          await supabase.from("EventRegistrations").select();

        // if (
        //   membersError ||
        //   venuesError ||
        //   eventsError ||
        //   eventRegistrationsError
        // ) {
        //   console.error("Error fetching data:", {
        //     membersError,
        //     venuesError,
        //     eventsError,
        //     eventRegistrationsError,
        //   });
        //   return;
        // }

        setMembers(membersData || []);
        setVenues(venuesData || []);
        setEvents(eventsData || []);
        setEventRegistrations(eventRegistrationsData || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { members, venues, events, eventRegistrations, loading };
};

export default useFetchData;

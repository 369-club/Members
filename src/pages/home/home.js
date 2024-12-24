import React, { useEffect, useState } from "react";
import EventCard from "../../components/sections/homepage/event-card";
import MemberGrid from "../../components/sections/homepage/member-grid";
import CustomLoader from "../../components/custom-loader";
import EventCardV2 from "../../components/sections/homepage/event-card-v2";
import supabase from "../../utils/supabaseClient";

function Home({ isLoading }) {
  const [members, setMembers] = useState([]);
  console.log("🚀 ~ Home ~ members:", members);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const { data, error } = await supabase.from("Members").select(); // Fetch all rows and columns
        console.log("🚀 ~ fetchMembers ~ error:", error);
        console.log("🚀 ~ venues ~ data:++++++", data);
        setMembers(data);
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);
  if (isLoading)
    return (
      <div style={{ height: "calc(100dvh - 120px)" }}>
        <CustomLoader />
      </div>
    );

  return (
    <div>
      <ul className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="#/">LAYOUT</a>
        </li>
        <li className="breadcrumb-item active">STARTER PAGE</li>
      </ul>

      <section className="mb-5">
        <h2 className="mb-2">Next Upcoming Event</h2>
        {/* <EventCard /> */}
        <EventCardV2 />
      </section>

      <section>
        <h2 className="mb-2">Inner Circle Members</h2>
        <MemberGrid />
      </section>
    </div>
  );
}

export default Home;

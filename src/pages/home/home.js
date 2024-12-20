import React, { useEffect, useState } from "react";
import supabase from "../../utils/supabaseClient";
function Home() {
  const [members, setMembers] = useState([]);
  console.log("🚀 ~ Home ~ members:", members);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const { data, error } = await supabase
          .from("event_registrations")
          .select(); // Fetch all rows and columns
        console.log("🚀 ~ fetchMembers ~ error:", error);
        console.log("🚀 ~ fetchMembers ~ data:", data);
        setMembers(data);
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);
  return (
    <div>
      <ul className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="#/">LAYOUT</a>
        </li>
        <li className="breadcrumb-item active">STARTER PAGE</li>
      </ul>

      <h1 className="page-header">
        Starter Page <small>page header description goes here...</small>
      </h1>

      <p>Start build your page here</p>
    </div>
  );
}

export default Home;

import React from "react";
import EventCard from "../../components/homepage/event-card";
import MemberGrid from "../../components/homepage/member-grid";

function Home() {
  return (
    <div>
      <ul className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="#/">LAYOUT</a>
        </li>
        <li className="breadcrumb-item active">STARTER PAGE</li>
      </ul>

      <section className="mb-5">
        <h2>Next Upcoming Event</h2>
        <EventCard />
      </section>

      <section>
        <h2>Inner Circle Members</h2>
        <MemberGrid />
      </section>
    </div>
  );
}

export default Home;

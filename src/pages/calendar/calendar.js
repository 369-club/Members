import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import useFetchData from "../../hooks/fetchData";
import CustomLoader from "../../components/custom-loader";
import { EventCard } from "../../components/sections/calendar/event-card";
import "../../scss/css/pages/calendar.scss";

const events = [{ title: "Meeting", start: new Date() }];

function Calendar() {
  const { events: fetchedEvents } = useFetchData();
  const events =
    fetchedEvents?.map((event) => ({
      title: event?.title ?? "Event",
      start: event?.when ? new Date(event.when) : new Date(),
    })) || [];

  console.log("🚀 ~ Calendar ~ events:++++++++++++++++ line no 9", events);

  if (!fetchedEvents?.length) return <CustomLoader gap="200" />;

  return (
    <div className="container-xl px-0 event-calendar">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={false}
        events={events}
        eventContent={renderEventContent}
      />
    </div>
  );
}

// Helper function to format date and time
function formatDateTime(isoString) {
  const date = new Date(isoString);
  const options = { hour: "numeric", minute: "numeric", hour12: true }; // Time in 12-hour format
  const formattedTime = date.toLocaleTimeString("en-US", options);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  return { formattedTime, formattedDate };
}

// Custom render function for event content
function renderEventContent(eventInfo) {
  const { formattedTime, formattedDate } = formatDateTime(
    eventInfo.event.start
  );

  return (
    <>
      <EventCard
        startTime={formattedTime}
        startDate={formattedDate}
        name={eventInfo.event.title}
      />
    </>
  );
}

export default Calendar;

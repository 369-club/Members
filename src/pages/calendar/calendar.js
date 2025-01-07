import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import useFetchData from "../../hooks/fetchData";
import CustomLoader from "../../components/custom-loader";

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
    <div>
      <h1>Demo App</h1>
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

// a custom render function
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
export default Calendar;

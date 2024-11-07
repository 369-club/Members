import bootstrapPlugin from '@fullcalendar/bootstrap';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import React, { useContext, useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { AppSettings } from './../../config/app-settings.js';

function Calendar() {
  const context = useContext(AppSettings);
  const plugins = [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin, bootstrapPlugin];
  const headerToolbar = {
    left: 'dayGridMonth,timeGridWeek,timeGridDay',
    center: 'title',
    right: 'prev,next today'
  };
  const buttonText = {
    today: 'Today',
    month: 'Month',
    week: 'Week',
    day: 'Day'
  };
  const views = {
    timeGrid: {
      eventLimit: 6
    }
  };
  const [events, setEvents] = useState();

  useEffect(() => {
    context.setAppContentFullHeight(true);

    var themeColor = (getComputedStyle(document.body).getPropertyValue('--bs-theme')).trim();
    var blue = (getComputedStyle(document.body).getPropertyValue('--bs-blue')).trim();
    var pink = (getComputedStyle(document.body).getPropertyValue('--bs-pink')).trim();
    var indigo = (getComputedStyle(document.body).getPropertyValue('--bs-indigo')).trim();
    var green = (getComputedStyle(document.body).getPropertyValue('--bs-green')).trim();

    setEvents([{
      title: 'OG Event',
      start: '2024-11-15',
      end: '2024-11-18',
      color: themeColor
    },
    {
      title: 'Physical preparation',
      start: '2024-11-16T08:00',
      end: '2024-11-16T11:00',
      color: pink
    },
    {
      title: 'Intentions / Philosophy',
      start: '2024-11-16T11:00',
      end: '2024-11-16T13:00',
      color: indigo
    },
    {
      title: '🍄',
      start: '2024-11-16T13:00',
      end: '2024-11-16T17:00',
      color: green
    },
    {
      title: 'Dinner',
      start: '2024-11-16T18:00',
      color: blue
    },]);

    return function cleanUp() {
      context.setAppContentFullHeight(false);
      context.setAppContentClass('');
    }

    // eslint-disable-next-line
  }, []);

  return (
    <div className="calendar">
      <div className="calendar-body">
        <PerfectScrollbar className="h-100">
          <FullCalendar
            plugins={plugins}
            initialView="dayGridMonth"
            themeSystem="bootstrap"
            headerToolbar={headerToolbar}
            buttonText={buttonText}
            events={events}
            views={views}
          />
        </PerfectScrollbar>
      </div>
    </div>
  )
}

export default Calendar;
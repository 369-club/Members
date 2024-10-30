import React, { useEffect, useContext, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { AppSettings } from './../../config/app-settings.js';

function Calendar() {
	const context = useContext(AppSettings);
	const plugins = [ dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin, bootstrapPlugin ];
	const headerToolbar = {
		left: 'dayGridMonth,timeGridWeek,timeGridDay',
		center: 'title',
		right: 'prev,next today'
	};
	const buttonText = {
		today:    'Today',
		month:    'Month',
		week:     'Week',
		day:      'Day'
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
		
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		month = (month < 10) ? '0' + month : month;
		
		setEvents([{
			title: 'OG Event',
			start: '2024-11-15',
			end: '2024-11-18',
			color: themeColor
		},
		{
			title: 'Physical preparation',
			start: '2024-11-16T13:00',
			end: '2024-11-16T16:00',
			color: pink
		},
		{
			title: 'Intentions / Philosophy',
			start: '2024-11-16T16:00',
			end: '2024-11-16T18:00',
			color: indigo
		},
		{
			title: '🍄',
			start: '2024-11-16T18:00',
			end: '2024-11-16T22:00',
			color: green
		},
		{
			title: 'Dinner',
			start: '2024-11-16T23:00',
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
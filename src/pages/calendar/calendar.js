import React, { useEffect, useContext, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
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
		context.setAppContentClass('p-0');
		
		var containerEl = document.getElementById('external-events');
		new Draggable(containerEl, {
			itemSelector: '.fc-event-link',
			eventData: function(eventEl) {
				return {
					title: eventEl.innerText,
					color: eventEl.getAttribute('data-color')
				};
			}
		});
		
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
			<div className="calendar-sidebar">
				<div className="desktop-sticky-top flex-fill h-100">
					<div className="calendar-sidebar-title">Draggable Events:</div>
					<div className="fc-event-list" id="external-events">
						<div className="fc-event-item"><div className="fc-event-link" data-color="#ff2d55"><i className="fa fa-circle fs-8px me-2 text-pink"></i> Meeting</div></div>
						<div className="fc-event-item"><div className="fc-event-link" data-color="#ff3b30"><i className="fa fa-circle fs-8px me-2 text-danger"></i> Group Discussion</div></div>
						<div className="fc-event-item"><div className="fc-event-link" data-color="#FF9500"><i className="fa fa-circle fs-8px me-2 text-warning"></i> Brainstorming</div></div>
						<div className="fc-event-item"><div className="fc-event-link" data-color="#FFCC00"><i className="fa fa-circle fs-8px me-2 text-yellow"></i> Presentation</div></div>
						<div className="fc-event-item"><div className="fc-event-link" data-color="#1ABD36"><i className="fa fa-circle fs-8px me-2 text-success"></i> Holiday</div></div>
						<div className="fc-event-item"><div className="fc-event-link" data-color="#0cd096"><i className="fa fa-circle fs-8px me-2 text-theme"></i> Sick Leave</div></div>
						<div className="fc-event-item"><div className="fc-event-link" data-color="#30beff"><i className="fa fa-circle fs-8px me-2 text-info"></i> Overtime</div></div>
						<div className="fc-event-item"><div className="fc-event-link" data-color="#1f6bff"><i className="fa fa-circle fs-8px me-2 text-blue"></i> Work from Home</div></div>
						<div className="fc-event-item"><div className="fc-event-link" data-color="#640DF3"><i className="fa fa-circle fs-8px me-2 text-indigo"></i> Business Travel</div></div>
						<div className="fc-event-item"><div className="fc-event-link" data-color="#5b2e91"><i className="fa fa-circle fs-8px me-2 text-purple"></i> Breakfast</div></div>
						<div className="fc-event-item"><div className="fc-event-link" data-color="#869ac0"><i className="fa fa-circle fs-8px me-2 text-muted"></i> Lunch</div></div>
						<div className="fc-event-item"><div className="fc-event-link" data-color="#869ac0"><i className="fa fa-circle fs-8px me-2 text-muted"></i> Dinner</div></div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Calendar;
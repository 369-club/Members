import React from "react";
import App from "./../app.jsx";
import { Navigate } from "react-router-dom";

import Home from "./../pages/home/home.js";
import PagesError from "./../pages/pages/error.js";
import Profile from "../pages/profile/profile.js";
import EventDetails from "../pages/event-details/event-details.js";
import Calendar from "../pages/calendar/calendar.js";

const AppRoute = [
  {
    path: "*",
    element: <App />,
    children: [
      { path: "", element: <Navigate to="/home" /> },
      { path: "home", element: <Home /> },
      { path: "calendar", element: <Calendar /> },
      { path: "profile", element: <Profile /> },
      { path: "member/:memberId", element: <Profile /> },
      { path: "event-details", element: <EventDetails /> },
      { path: "event/:eventId", element: <EventDetails /> },
      { path: "*", element: <PagesError /> },
    ],
  },
];

export default AppRoute;

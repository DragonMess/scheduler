import React, { useState, useEffect } from "react";
import axios from "axios";
import Appointment from "components/Appointment/index.js";
import "components/styles/Application.scss";
import DayList from "./DayList";
// import logo from "../../public/images/logo.png";
// let daysList = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];

// const appointmentsData = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       },
//     },
//   },
//   {
//     id: 3,
//     time: "3pm",
//   },

//   {
//     id: 4,
//     time: "4pm",
//     interview: {
//       student: "Camilo Pineda",
//       interviewer: {
//         id: 1,
//         name: "Tori Malcolm",
//         avatar: "https://i.imgur.com/Nmx0Qxo.png",
//       },
//     },
//   },
// ];
export default function Application(props) {
  let [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

  const setDay = (day) => setState((prev) => ({ ...prev, days }));

  useEffect(() => {
    axios
      .all([axios.get("/api/days"), axios.get("/api/appointments")])
      .then((all) => {
        setDays(all[0].data);
        setAppointments(all[1].data);
      });
  }, []);

  const [days, setDays] = useState([]);

  const [appointments, setAppointments] = useState({});

  const apointmentsList = Object.keys(appointments).map((appointment) => {
    return (
      // <Appointment
      //   key={appointments[appointment].id}
      //   id={appointments[appointment].id}
      //   time={appointments[appointment].time}
      //   interview={appointments[appointment].interview}
      // />
      <Appointment
        key={appointments[appointment].id}
        {...appointments[appointment]}
      />
    );
  });
  // const [day, setDay] = useState("Monday");
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="../../public/images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />

        <DayList days={days} day={state.day} setDay={setDay} />
        <nav className="sidebar__menu"></nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />

        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
      </section>
      <section className="schedule">
        {apointmentsList}
        <Appointment key="last" time="5pm" />
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
  );
}

import React from "react";
import useApplicationData from "../hooks/useApplicationData"
import Appointment from "components/Appointment/index.js";
import "components/styles/Application.scss";
import DayList from "./DayList";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";

export default function Application(props) {

  const { state,
          setDay,
          save,
          deleted,
          cancelInterview,
        } = useApplicationData();


  const appointmentsData = getAppointmentsForDay(state, state.day);
  const schedule = appointmentsData
    ? appointmentsData.map((appointment) => {
        const interview = getInterview(state, appointment.interview);
        const interviewers = getInterviewersForDay(state, state.day);

        return (
          <Appointment
            key={appointment.id}
            id={appointment.id}
            time={appointment.time}
            interview={interview}
            interviewers={interviewers}
            save={save}
            deleted={deleted}
            cancelInterview={cancelInterview}

          />
        );
      })
    : undefined;
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />

        <DayList days={state.days} day={state.day} setDay={setDay} />
        <nav className="sidebar__menu"></nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

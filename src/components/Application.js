import React from "react";
import useApplicationData from "../hooks/useApplicationData"
import Appointment from "components/Appointment/index.js";
import "components/styles/Application.scss";
import DayList from "./DayList";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
  getSpotsForDay
} from "helpers/selectors";
import { template } from "@babel/core";

export default function Application(props) {

  const { state,
          setDay,
          save,
          deleted,
          cancelInterview,

        } = useApplicationData();
        
  // const spotsData=getSpotsForDay(state);
  const appointmentsData = getAppointmentsForDay(state, state.day);
  const schedule = appointmentsData
    ? appointmentsData.map((appointment) => {
        const interview = getInterview(state, appointment.interview);
        const interviewers = getInterviewersForDay(state, state.day);
      // console.log("interv: ", interview)
      // console.log("appointmentsData: ", appointmentsData)
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

        <DayList  days={state.days} day={state.day} setDay={setDay} />
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

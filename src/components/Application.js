import React, { useState, useEffect } from "react";
import axios from "axios";
import Appointment from "components/Appointment/index.js";
import "components/styles/Application.scss";
import DayList from "./DayList";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [{ id: 0, time: "", interviewer: 0 }],
    interviewers: {
      "1": {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      },
    },
  });


  // setState(prevState => return { ...prevState })
  const setDay = (day) => setState({ ...state, day: day });

  function bookInterview(id, interview) {
    const appointmentInt = {
      ...state.appointments[id],
      interview,
    };
    setState({
      ...state,
      appointments: {
        ...state.appointments,
        [id]: appointmentInt,
      },
    });
    return axios({
      url: `/api/appointments/${id}`,
      method: "PUT",
      data: appointmentInt,
    })
      .then((res) => 
        {
          console.log(res)
        setState({
          ...state,
          appointments: {
            ...state.appointments,
            [id]: appointmentInt,
          },
        });
        }
        
      )
      .catch((err) => console.log(err));
  }
  function editInterview(id, interview) {
    const appointmentInt = {
      ...state.appointments[id],
      interview,
    };
    setState({
      ...state,
      appointments: {
        ...state.appointments,
        [id]: appointmentInt,
      },
    });
    return axios({
      url: `/api/appointments/${id}`,
      method: "PUT",
      data: appointmentInt,
    })
      .then((res) => {
        console.log(res)
        setState({
          ...state,
          appointments: {
            ...state.appointments,
            [id]: appointmentInt,
          },
        });
      }

      )
      .catch((err) => console.log(err));
  }

  function cancelInterview(id, interview) {
    const appointmentInt = {
      ...state.appointments[id],
      interview:null
    };
    setState(prevState => prevState)
    setState({
      ...state,
      appointments: {
        ...state.appointments,
        [id]: appointmentInt,
      },
      
    });
    return axios({
      url: `/api/appointments/${id}`,
      method: "DELETE",
    })
      .then((res) => {
        setState({
          ...state,
          appointments: {
            ...state.appointments,
            [id]: appointmentInt,
          },
        });
      }

      )
      .catch((err) => delError(err));
  }
const delError = (err)=>{
return err;
}
  function deleted(id,interviewer) {
    const interview = {
      student: null,
      interviewer,
    };
    return cancelInterview(id, interview)
  }
  function save(name, interviewer, idAppoint) {
    const interview = {
      student: name,
      interviewer,
    };
   return bookInterview(idAppoint, interview);
  };
  function confirm(res) {


    return res;
  };


  useEffect(() => {
    axios
      .all([
        axios.get("/api/days"),
        axios.get("/api/appointments"),
        axios.get("/api/interviewers"),
      ])
      .then((all) => {
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      });
  }, []);
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
            // bookInterview={bookInterview}
            save={save}
            deleted={deleted}
            cancelInterview={cancelInterview}
            confirm={confirm}
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

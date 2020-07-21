import { useState, useEffect } from "react";
import axios, * as others from "axios";
import "components/styles/Application.scss";

const getSpotsForDay = (day, appointments) =>
  day.appointments.length -
  day.appointments.reduce(
    (count, id) => (appointments[id].interview ? count + 1 : count),
    0
  );

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: {},
  });

  const setDay = (day) => {
    setState({ ...state, day });
  };

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  function bookInterview(id, interview) {
    const appointments = {
      //open appointments in state
      ...state.appointments, //keep the actual state.appointments
      [id]: {
        // open id in appointments
        ...state.appointments[id], //
        id,
        interview,
      },
    };
    return axios.put(`/api/appointments/${id}`, { interview }).then((res) => {
      const idDay = 0;
      setState({
        ...state, //keep
        days: state.days.map((day) => {
          return day.appointments.includes(id)
            ? { ...day, spots: getSpotsForDay(day, appointments) }
            : day;
        }),
        appointments,
      });
    });
  }

  function cancelInterview(id, interview) {
    const appointmentInt = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointmentInt,
    };
    return axios.delete(`/api/appointments/${id}`).then((res) => {
      setState({
        ...state,
        days: state.days.map((day) => {
          return day.appointments.includes(id)
            ? { ...day, spots: getSpotsForDay(day, appointments) }
            : day;
        }),
        appointments,
      });
    });
  }

  function deleted(id, interviewer) {
    const interview = {
      student: null,
      interviewer,
    };
    return cancelInterview(id, interview);
  }
  function save(name, interviewer, idAppoint) {
    const interview = {
      student: name,
      interviewer,
    };
    return bookInterview(idAppoint, interview);
  }

  return {
    state,
    setDay,
    save,
    deleted,
    cancelInterview,
  };
}

import { useState, useEffect } from "react";
import axios, * as others from "axios";
import "components/styles/Application.scss";
import { array } from "prop-types";

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

  // const setDayInDaysList = (currentDay, returnedDayList) => {
  //   let indexOfMatchedDay = 0;
  //   const matchedDay = returnedDayList.filter((day, index) => {
  //     if (day.name === currentDay) {
  //       indexOfMatchedDay = index;
  //       return day;
  //     }
  //   });

  //   const updatedDaysArray = state.days.slice();
  //   updatedDaysArray[indexOfMatchedDay] = matchedDay[0];
  //   setState({
  //     ...state,
  //     days: updatedDaysArray,
  //   });
  // };

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
    return axios.put(`/api/appointments/${id}`, { interview }).then((res) => {
      const idDay = 0;
      setState({
        ...state, //keep
        appointments: {
          //open appointments in state
          ...state.appointments, //keep the actual state.appointments
          [id]: {
            // open id in appointments
            ...state.appointments[id], //
            id,
            interview,
          },
        },
      });
      // updateSpots(state.day);
    });
  }

  // const updateSpots = (currentDay) => {
  //   axios.get("/api/days").then((res) => {
  //     setDayInDaysList(currentDay, res.data);
  //   });
  // };

  function cancelInterview(id, interview) {
    const appointmentInt = {
      ...state.appointments[id],
      interview: null,
    };

    setState((prevState) => prevState);
    return axios.delete(`/api/appointments/${id}`).then((res) => {
      setState({
        ...state,
        appointments: {
          ...state.appointments,
          [id]: appointmentInt,
        },
      });
    });
    // .catch((err) => console.log(err));
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

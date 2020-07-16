import { useState, useEffect } from "react";
import axios from "axios";
import "components/styles/Application.scss";

export default function useApplicationData() {
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
    }).then((res) => {
      console.log(res);
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

  function cancelInterview(id, interview) {
    const appointmentInt = {
      ...state.appointments[id],
      interview: null,
    };
    setState((prevState) => prevState);
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
    }).then((res) => {
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
  return {
    state,
    setDay,
    save,
    deleted,
    cancelInterview,
  };
}

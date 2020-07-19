import { useState, useEffect } from "react";
import axios, * as others from "axios";
import "components/styles/Application.scss";
import { array } from "prop-types";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: {
      "1": {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      },
    },
  });

  const setDay = (day) => setState({ ...state, day: day });

  const appointmentInt = (id, interview) => {
    return {
      ...state.appointments[id],
      interview,
    };
  };
  // console.log("Monday: ", { ...state, days: [0] });
  console.log("spots: ", { ...state.days[0] }.appointments);
  const spotDay = () => {
    let daysId = 0;
    const appointmentDayId = (daysId) => {
      return {
        ...state.days[daysId],
      };
    };

    let appointmentsArray;
    for (let i = 1; i < 6; i++) {
      // Monday
      daysId = 0;
      // console.log(appointmentDayId(daysId).appointments);
      let se = state.appointmentDayId;
      console.log(se);
      // for (let inter in state.appointments)
      // for (let appointmentIdDay of appointmentDayId(daysId).appointments) {
      // }
    }
    // if (id < 11) {
    //   // Tuesday
    //   daysId = 1;
    // }
    // if (id < 16) {
    //   // Wednesday
    //   daysId = 2;
    // }
    // if (id < 21) {
    //   // Thursday
    //   daysId = 3;
    // }
    // if (id < 26) {
    //   // Friday
    //   daysId = 4;
    // }
  };
  const upDate = () => {
    let appointmentsMonday = [];
    for (let i = 1; i < 6; i++) {
      if ({ ...state.appointments[i] }.interview) {
        appointmentsMonday.push(i);
      }
    }
    let appointmentsTuesday = [];
    for (let i = 6; i < 11; i++) {
      if ({ ...state.appointments[i] }.interview) {
        appointmentsTuesday.push(i);
      }
    }
    let appointmentsWednesday = [];
    for (let i = 11; i < 16; i++) {
      if ({ ...state.appointments[i] }.interview) {
        appointmentsWednesday.push(i);
      }
    }
    let appointmentsThursday = [];
    for (let i = 16; i < 21; i++) {
      if ({ ...state.appointments[i] }.interview) {
        appointmentsThursday.push(i);
      }
    }
    let appointmentsFriday = [];
    for (let i = 21; i < 26; i++) {
      if ({ ...state.appointments[i] }.interview) {
        appointmentsFriday.push(i);
      }
    }
    let SpotsDays = {
      0: 5 - appointmentsMonday.length,
      1: 5 - appointmentsTuesday.length,
      2: 5 - appointmentsWednesday.length,
      3: 5 - appointmentsThursday.length,
      4: 5 - appointmentsFriday.length,
    };
    return SpotsDays;
  };
  console.log(":::", upDate());
  function bookInterview(id, interview) {
    appointmentInt(id, interview);

    // calcul the lenght of spotsArray and + 1
    // modify the state
    // const daysInt = {};

    return axios
      .put(
        `/api/appointments/${id}`,
        // method: "PUT",
        appointmentInt(id, interview)
      )
      .then((res) => {
        setState({
          ...state,
          appointments: {
            ...state.appointments,
            [id]: appointmentInt(id, interview),
          },
        });
        console.log(upDate);

        // setState({
        //   ...state,
        //   days: {
        //     ...state.days[id].interviewers,
        //     spots: upDate.id,
        //   },
        // });
      });
    // .catch((err) => console.log(err));
  }
  console.log("add: ", {
    ...state,
    days: {
      ...state.days,
      ["0"]: "interviewers",
      // spots: upDate[0],
    },
  });

  function cancelInterview(id, interview) {
    const appointmentInt = {
      ...state.appointments[id],
      interview: null,
    };
    console.log("appInterDEL :", appointmentInt.interview); //null

    setState((prevState) => prevState);
    console.log("del: ", state.days);
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
  return {
    state,
    setDay,
    save,
    deleted,
    cancelInterview,
  };
}

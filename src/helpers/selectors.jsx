
  export function getSpotsForDay(state) {

  if (state != undefined) {
  let appointmentsMonday = [];
  for (let i = 1; i < 6; i++) {
    if ({ ...state.appointments[i] }.interview != null) {
      appointmentsMonday.push(i);
    }
  }

  let appointmentsTuesday = [];
  for (let i = 6; i < 11; i++) {
    if ({ ...state.appointments[i] }.interview != null) {
      appointmentsTuesday.push(i);
    }
  }
  let appointmentsWednesday = [];
  for (let i = 11; i < 16; i++) {
    if ({ ...state.appointments[i] }.interview != null) {
      appointmentsWednesday.push(i);
    }
  }
  let appointmentsThursday = [];
  for (let i = 16; i < 21; i++) {
    if ({ ...state.appointments[i] }.interview != null) {
      appointmentsThursday.push(i);
    }
  }
  let appointmentsFriday = [];
  for (let i = 21; i < 26; i++) {
    if ({ ...state.appointments[i] }.interview != null) {
      appointmentsFriday.push(i);
    }
    
  }

  let appointmentsDays = {
    Monday: 5 - appointmentsMonday.length,
    Tuesday: 5-appointmentsTuesday.length,
    Wednesday: 5-appointmentsWednesday.length,
    Thursday: 5-appointmentsThursday.length,
    Friday: 5-appointmentsFriday.length,
  };

    return appointmentsDays;
  }else{
    return []
  }
  
};

export function getAppointmentsForDay(state, dayName) { 
  if (state !== undefined || dayName) {
    let theState = {};
    
    for (let days of state.days) {
      const idDay = days.id
      
        // && state.appointments[idDay].interview !== null
      if (days.name === dayName ) {
        theState = days.appointments;
      }
    }

    const daysAppointments = [];

    if (theState.length > 0) {
      for (let appointment of theState) {
        if(state.appointments)
        daysAppointments.push(state.appointments[appointment]);
      }
    }
    return daysAppointments;
  } else {
    return []
  }

}
//================//==============================//===========
//   // const foundDay = state.days.find(day => dayName === day.name);

//   // if (state.days.length === 0 || foundDay === undefined) {
//   //   return [];
//   // }

//   // return foundDay.appointments.map(id => state.appointments[id]);
// }

export function getInterview(state, interview) {

  let theState = {};
  if (state !== undefined && interview != null) {

    const idInterviewer = interview.interviewer;

    theState = {
      "student": interview.student,
      "interviewer": {
        "id": interview.interviewer,
        "name": state.interviewers[idInterviewer].name,
        "avatar": state.interviewers[idInterviewer].avatar
      }
    }
  } else {
    return null
  }
  return theState;
}

export function getInterviewersForDay(state, dayName) {
  if (state !== undefined || dayName) {
    let theState = {};
    for (let days of state.days) {
      if (days.name === dayName) {
        theState = days.appointments;
      }
    }
    let daysAppointments = [];
    if (theState.length > 0) {
      for (let appointment of theState) {
        daysAppointments.push(state.appointments[appointment]);
      }
    }

    const InterviewersData = Object.keys((state.interviewers)).map(key => {
      return (state.interviewers)[key];
    })
    return (InterviewersData)

  } else {
    return []
  }
}

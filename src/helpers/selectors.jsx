
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
    const {name="", avatar="" } = state.interviewers[idInterviewer] || {};

    theState = {
      "student": interview.student,
      "interviewer": {
        "id": idInterviewer,
        name,
        avatar
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

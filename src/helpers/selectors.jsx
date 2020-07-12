
export function getAppointmentsForDay(state, dayName) { 
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
    return daysAppointments;
  } else {
    return []
  }
}
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
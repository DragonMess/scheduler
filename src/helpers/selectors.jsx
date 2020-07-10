
export function getAppointmentsForDay(state, dayName) { 
  let someArray = []
  if (state.days.length === 0) {
    return []
  } else { }

  const filteredAppointmentDayname = state.days.filter(day => {


    if (day.name === dayName) {
      // console.log(day.appointments)
      return day.appointments
    } else {
      day.appointments = [];
    }


  });

  for (let elem of filteredAppointmentDayname[0].appointments) {
    someArray.push(elem.toString())
  }
  return someArray

}
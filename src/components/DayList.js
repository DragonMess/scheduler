import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const { days, day, setDay } = props;
  const daysList = days
    ? days.map((dayData, index) => {
        return (
          <DayListItem
            key={index}
            id={index}
            name={dayData.name}
            spots={dayData.spots}
            selected={dayData.name === day}
            setDay={setDay}
          />
        );
      })
    : undefined;
  return <ul>{daysList}</ul>;
}

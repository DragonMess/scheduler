import React, { useState } from "react";
import "components/styles/DayListItem.scss";
import classnames from "classnames/bind";

export default function DayListItem(props) {
  const { name, setDay, selected, spots } = props;
  const [isSelected, setSelected] = useState(selected);
  // console.log("hi", selected);
  // let spots;
  // const spots = spotsData.name;
  const handleDay = (e) => {
    setDay(name);
    // spots = spotsData[name];
    setSelected(true);
    setSelected(isSelected);
  };

  // function to pass the test & show the spots remaining
  const formatSpots = (spots) => {
    let res;
    if (spots < 1) {
      res = "no spots remaining";
    }
    if (spots === 1) {
      res = "1 spot remaining";
    }
    if (spots > 1) {
      res = `${spots} spots remaining`;
    }
    return res;
  };

  // Using classnames lib to give different classNames for one tag
  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0,
  });
  return (
    <li data-testid="day" className={dayClass} onClick={handleDay}>
      <h2 data-testid="day" className="text--regular">
        {name}
      </h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}

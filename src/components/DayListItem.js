import React, { useState } from "react";
import "components/styles/DayListItem.scss";
import classnames from "classnames/bind";

export default function DayListItem(props) {
  const { name, spots, setDay, selected } = props;
  const [isSelected, setSelected] = useState(selected);
  // console.log("hi", selected);
  const handleDay = (e) => {
    setDay(name);
    setSelected(true);
    setSelected(isSelected);
  };

  // function to pass the test & show the spots remaining
  const formatSpots = (spots) => {
    let res;
    if (spots === 0) {
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
    <li className={dayClass} onClick={handleDay}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}

import React from "react";
import "components/styles/InterviewerListItem.scss";
import classnames from "classnames/bind";

export default function InterviewerListItem(props) {
  const { name, avatar, selected, setInterviewer } = props;

  const interviewerClass = classnames("interviewers", {
    "interviewers__item--selected": selected,
    // "interviewers__item--selected-image": selected === name
  });

  return (
    <li className={interviewerClass} onClick={setInterviewer}>
      <img className="interviewers__item-image" src={avatar} alt={name} />
      {selected && name}
    </li>
  );
}

import React from "react";
import "components/styles/InterviewerListItem.scss";
import classnames from "classnames/bind";

export default function InterviewerListItem(props) {
  const { id, name, avatar, selected, setInterviewer } = props;

  const interviewerClass = classnames("interviewers", {
    "interviewers__item--selected": selected,
    // "interviewers__item--selected-image": selected === name
  });

  return (
    <li className={interviewerClass} onClick={() => setInterviewer(id)}>
      <img className="interviewers__item-image" src={avatar} alt={name} />
      {name}
    </li>
  );
}

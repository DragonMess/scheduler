import React from "react";
import "components/styles/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
import "components/styles/InterviewerList.scss";
import PropTypes from "prop-types";

export default function InterviewerList(props) {
  const { interviewers, value, onChange } = props;
  const interviewerList = interviewers
    ? interviewers.map((interviewerData) => {
        return (
          <InterviewerListItem
            key={interviewerData.id}
            name={interviewerData.name}
            avatar={interviewerData.avatar}
            selected={interviewerData.id === value}
            setInterviewer={(event) => onChange(interviewerData.id)}
          />
        );
      })
    : undefined;
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerList}</ul>
    </section>
  );
}

InterviewerList.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};
// id, name, avatar, selected, setInterviewer;

import React from "react";
import "components/styles/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
import "components/styles/InterviewerList.scss";

export default function InterviewerList(props) {
  const { interviewers, interviewer, setInterviewer } = props;
  const interviewerList = interviewers
    ? interviewers.map((interviewerData, index) => {
        return (
          <InterviewerListItem
            key={index}
            id={index}
            name={interviewerData.name}
            avatar={interviewerData.avatar}
            selected={interviewerData.name === interviewer}
            setInterviewer={setInterviewer}
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
// id, name, avatar, selected, setInterviewer;

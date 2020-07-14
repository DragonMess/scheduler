import React, { useState } from "react";
import "components/Appointment/Header";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const { save, deleted, confirm } = props;
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const FORM = "FORM";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  // console.log(props.bookInterview);
  const [isAdd, setChange] = useState(false);

  const onAdd = (result) => {
    if (result === undefined) {
      setChange(false);
    } else {
      setChange(result);
    }
    return transition(FORM);
  };

  const onCancel = (result) => {
    if (result === undefined) {
      setChange(false);
    } else {
      setChange(result);
    }
    return back(result);
  };

  const onConfirm = (result) => {
    if (result === undefined) {
      setChange(false);
    } else {
      setChange(result);
    }
    // console.log(result);
    return transition(result);
  };

  const onDelete = (onConfirm) => {
    transition(CONFIRM);
    console.log(onConfirm);
    // confirm();
    // confirm(res).then(() => transition(DELETING));

    // transition(DELETING);
    // transition(DELETING);
    deleted(props.id).then(() => transition(EMPTY));
  };

  const onSave = (name, interviewer, id) => {
    transition(SAVING);
    save(name, interviewer, id).then(() => transition(SHOW));
  };

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && (
        <Empty onAdd={onAdd} interviewers={props.interviewers} />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={onDelete}
          idInterview={props.id}
        />
      )}
      {mode === FORM && (
        <Form
          onCancel={onCancel}
          name={props.name}
          interviewers={props.interviewers}
          interviewer={props.interviewer}
          onSave={onSave}
          // bookInterview={bookInterview}
          idInterview={props.id}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && (
        <Confirm
          onConfirm={onConfirm}
          onCancel={onCancel}
          message="Are you sure you would like to delete?"
        />
      )}
      {/* {props.interview ? (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      ) : (
        <Empty />
      )} */}
    </article>
  );
}

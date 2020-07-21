import React, { useState } from "react";
import "components/Appointment/Header";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const { save, deleted, id, state } = props;
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const FORM = "FORM";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDITING = "EDITING";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const [isAdd, setChange] = useState(false);

  const onAdd = (result) => {
    if (result === undefined) {
      setChange(false);
    } else {
      setChange(result);
    }
    return transition(FORM);
  };

  const confirmDelete = () => {
    transition(CONFIRM);
  };

  const onDelete = () => {
    transition(DELETING, true);
    deleted(props.id)
      .then(() => transition(EMPTY))
      .catch((err) => {
        transition(ERROR_DELETE, true);
      });
  };

  const onSave = (name, interviewer, event) => {
    console.log("before");
    transition(SAVING, true);
    console.log("after");
    save(name, interviewer, props.id)
      .then(() => {
        console.log("save");
        transition(SHOW);
      })
      .catch((err) => transition(ERROR_SAVE, true));
  };
  const onEdit = () => {
    transition(FORM);
  };

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article data-testid="appointment" className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && (
        <Empty onAdd={onAdd} interviewers={props.interviewers} />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          // in other way below
          // onDelete={() => {
          //   transition(CONFIRM);
          // }}
          onDelete={confirmDelete}
          idInterview={props.id}
          // in other way below
          // onEdit={() => transition(FORM)}
          onEdit={onEdit}
        />
      )}
      {mode === FORM && (
        <Form
          onCancel={back}
          name={props.name}
          interviewers={props.interviewers}
          interviewer={props.interviewer}
          onSave={onSave}
          idInterview={props.id}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}

      {mode === EDITING && <Status message="Editing" />}

      {mode === ERROR_SAVE && (
        <Error message="Could not book appointment" onCancel={back} />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Could not cancel appointment" onCancel={back} />
      )}
      {mode === CONFIRM && (
        <Confirm
          onDelete={onDelete}
          onCancel={back}
          message="Are you sure you would like to delete?"
        />
      )}

      {/* Other way to do this =>
      {props.interview ? (
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

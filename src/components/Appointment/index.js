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
  const { save, deleted, id } = props;
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

  // const onCancel = (result) => {
  //   if (result === undefined) {
  //     setChange(false);
  //   } else {
  //     setChange(result);
  //   }
  //   return back;
  // };
  const confirmDelete = () => {
    transition(CONFIRM);
  };

  const onDelete = () => {
    transition(DELETING, true);
    deleted(props.id)
      .then(() => transition(EMPTY))
      .catch((err) => {
        transition(ERROR_DELETE);
      });
  };
  // function destroy(event) {
  //   transition(DELETING, true);
  //   props
  //     .cancelInterview(props.id)
  //     .then(() => transition(EMPTY))
  //     .catch((error) => transition(ERROR_DELETE, true));
  // }

  const onSave = (name, interviewer, event) => {
    transition(SAVING, true);
    save(name, interviewer, id)
      .then(() => transition(SHOW))
      .catch((err) => transition(ERROR_SAVE, true));
    // setHistory((prev) => [...prev, mode]);
  };

  const onEdit = () => {
    transition(FORM);
    // save(name, interviewer).then(() => transition(SHOW));
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
          // onDelete={() => {
          //   transition(CONFIRM);
          // }}
          onDelete={confirmDelete}
          idInterview={props.id}
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

      {mode === ERROR_SAVE && <Error message="Error Saving" onCancel={back} />}
      {mode === ERROR_DELETE && (
        <Error message="Error Deleting" onCancel={back} />
      )}
      {mode === CONFIRM && (
        <Confirm
          onDelete={onDelete}
          onCancel={back}
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

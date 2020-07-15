import React from "react";
import Button from "components/Button";

export default function Confirm(props) {
  const { message, onDelete, onCancel } = props;
  console.log(props)
  const SHOW = "SHOW";
  const DELETING = "DELETING";
  const EDITING = "EDITING";
//  Confirm call function onDelet 

  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{message}</h1>
      <section className="appointment__actions">
        <Button danger onClick={onCancel}>Cancel</Button>
        <Button danger onClick={onDelete}>Confirm</Button>
      </section>
    </main>
  );
}
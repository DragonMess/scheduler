import React from "react";
import Button from "components/Button";

export default function Confirm(props) {
  const { message, onConfirm, onCancel } = props;
  console.log(props)
  const SHOW = "SHOW";
  const DELETING = "DELETING";
  const EDITING = "EDITING";
  const handleOnCancel = () => {
    onCancel(SHOW)
  }
  const handleOnConfirm = () => {
    if (message === "Are you sure you would like to delete?" ){
      onConfirm(DELETING)
    }else {
      onConfirm(EDITING)
    }
    
  }

  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{message}</h1>
      <section className="appointment__actions">
        <Button danger onClick={handleOnCancel}>Cancel</Button>
        <Button danger onClick={handleOnConfirm}>Confirm</Button>
      </section>
    </main>
  );
}
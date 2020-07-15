import React from "react";

export default function Show(props) {
  const { student, interviewer: { id, name, avatar, idInterview}, onEdit,onDelete } = props;
  const handleDelete = () => {
    onDelete(idInterview, {interviewer: 0})

  }
      const handleOnSave = () => {
        onEdit(name, { id, name, avatar, idInterview }, idInterview)
  }
  
  
  return (
    <main className="appointment__card appointment__card--show">
      <section className="appointment__card-left">
        <h2 className="text--regular">{student}</h2>
        <section className="interviewer">
          <h4 className="text--light">Interviewer</h4>
          <h3 className="text--regular">{name}</h3>
        </section>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <img
            className="appointment__actions-button"
            src="images/edit.png"
            alt="Edit"
            onClick={handleOnSave}
          />
          <img
            className="appointment__actions-button"
            src="images/trash.png"
            alt="Delete"
            onClick={handleDelete}
          />
        </section>
      </section>
    </main>
  );
}

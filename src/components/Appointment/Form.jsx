import React,{useState} from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const { interviewers, onCancel, onSave, idInterview} = props;

  const [error, setError] = useState("");

//onCancel call back in the index.js

// Validate fct staudent name and interviewer before save
  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    // if (interviewer === null) {
    //   setError("You need to choose an interviewer");
    //   return;
    // }

    props.onSave(name, interviewer);
  }
  
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            data-testid="student-name-input"
            className="appointment__create-input text--semi-bold"
            value={name}
            type="text"
            placeholder="Enter Student Name"
            onChange={(e)=>{setName(e.target.value)}}
          /*
            This must be a controlled component
          */
          />
        </form>
        {/* <section className="appointment__validation">{error}</section> */}
        <InterviewerList interviewers={interviewers} value={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={() => {
                                        onCancel()
                                        setName("")
                                        setInterviewer(null)}
                                        }>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  );
}
import React,{useState} from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const { interviewers, onCancel, onSave} = props;

  // const onSave = (event) => {
  //   event.preventDefault();
  //   setName(name);
  // }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
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
        <InterviewerList interviewers={interviewers} value={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={()=>{ onCancel()
                                        setName("")
                                        setInterviewer(null)}
                                        }>Cancel</Button>
          <Button confirm onClick={()=>{onSave(name,interviewer)}}>Save</Button>
        </section>
      </section>
    </main>
  );
}
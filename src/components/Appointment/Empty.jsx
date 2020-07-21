import React from "react";

export default function Empty(props) {
  let { onAdd } = props;

const handleOnAdd = () => {
onAdd(true)
}

  return (
    <main data-testid="empty" className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={handleOnAdd}
      />
    </main>
  )
}
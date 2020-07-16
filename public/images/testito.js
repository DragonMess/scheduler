// import React from "react";

// import { render, cleanup, fireEvent, prettyDOM } from "@testing-library/react";

// import Form from "components/Appointment/Form";

// // afterEach(cleanup);

// describe("Form", () => {
//   const interviewers = [
//     {
//       id: 1,
//       name: "Sylvia Palmer",
//       avatar: "https://i.imgur.com/LpaY82x.png",
//     },
//   ];
//   /*
//   A test that renders a React Component
// */

//   it("submits the name entered by the user", () => {
//     // const onSave = jest.fn();
//     const onSave = jest.fn();
//     const { getByText, getByPlaceholderText } = render(
//       <Form interviewers={interviewers} onSave={onSave} />
//     );
//     const input = getByPlaceholderText("Enter Student Name");
//     const save = getByText("Save");
//     console.log(prettyDOM(save));
//     fireEvent.change(input, { target: { value: "Lydia Miller-Jones" } });
//     fireEvent.click(getByText("Save"));
//     expect(onSave).toHaveBeenCalledTimes(1);
//     expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
//   });
// });

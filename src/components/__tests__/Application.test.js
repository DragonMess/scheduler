import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  prettyDOM,
  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
  queryByAltText,
  waitFor,
} from "@testing-library/react";
// import test from "ava";

import Application from "components/Application";

import axios from "axios";
// axios.defaults.baseURL = "http://localhost:8001";

describe("Application", () => {
  beforeEach(cleanup);

  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    //1. Render the Application.
    const { container, debug } = render(<Application />);
    // console.log(container);

    // 2.Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // console.log(prettyDOM(container));
    // select array of articles =appointments
    const appointments = getAllByTestId(container, "appointment");

    // the first arcticle in array is an appointment "EMPTY" getAllByTestId(container, "appointment")[0];
    // the second arcticle in array is an appointment "EMPTY" getAllByTestId(container, "appointment")[1];
    const appointment = appointments[0];
    // console.log(prettyDOM(appointment));

    // 3.Click the "Add" button on the first empty appointment.
    fireEvent.click(getByAltText(appointment, "Add"));

    // 4.Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: {
        value: "Lydia Miller-Jones",
      },
    });
    // 5.Click the first interviewer in the list = "Sylvia Palmer"
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 6 Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));
    // debug();
    // console.log(prettyDOM(appointment));

    // 7.Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // 8.Wait until the element with the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    // expect(getByText(appointment, "Saving")).not.toBeInTheDocument();
    // 9.Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    debug();
    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find((appointment) => queryByText(appointment, "Archie Cohen"));

    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(
      getByText(appointment, "Are you sure you would like to delete?")
    ).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application. const { container } =
    const { container, debug } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // 3. Clickthe "Edit" button on the booked appointment.
    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find((appointment) => queryByText(appointment, "Archie Cohen"));

    fireEvent.click(queryByAltText(appointment, "Edit"));
    // 4.Change placeholder by student name
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: {
        value: "Lydia Miller-Jones",
      },
    });

    // fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    // 5. Click the"Save" button on the booked appointment.
    fireEvent.click(getByText(appointment, "Save"));
    // 7.Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    // 7. Wait until the element with the "Add" button is displayed. await
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    // console.log(prettyDOM(appointment));
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spotsremaining".
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  /* test number five */
  it("shows the save error when failing to save an appointment", () => {
    axios.put.mockRejectedValueOnce();
  });
  // close describe
});

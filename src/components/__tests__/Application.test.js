import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  prettyDOM,
} from "@testing-library/react";

import Application from "components/Application";
import axios from "axios";

// afterEach(cleanup);

xit("renders without crashing", () => {
  render(<Application />);
});

axios.defaults.baseURL = "http://localhost:8001";
// waitForElement

// it("defaults to Monday and changes the schedule when a new day is selected", () => {
//   const { getByText } = render(<Application />);

//   return waitForElement(() => getByText("Monday")).then(() => {
//     fireEvent.click(getByText("Tuesday"));
//     expect(getByText("Leopold Silvers")).toBeInTheDocument();
//   });
// });

// it("changes the schedule when a new day is selected", async () => {
//   const { getByText } = render(<Application />);

//   await waitForElement(() => getByText("Monday"));

//   fireEvent.click(getByText("Tuesday"));

//   expect(getByText("Leopold Silvers")).toBeInTheDocument();
// });

it("defaults to Monday and changes the schedule when a new day is selected", () => {
  const { getByText } = render(<Application />);

  return waitForElement(() => getByText("Monday")).then(() => {
    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
});

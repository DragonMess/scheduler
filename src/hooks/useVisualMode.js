import { useState } from "react";
export default function useMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    if (replace === true) {
      setMode(mode);
      setHistory([history[0], mode]);
    } else {
      setMode(mode);
      setHistory([...history, mode]);
    }
  }
  function back() {
    if (history.length > 1) {
      const laststate = history.length - 2;
      // setMode(history[laststate]);
      setMode(history[history.length - 2]);
      setHistory(history.splice(0, laststate + 1));
    } else {
      setMode(initial);
    }
  }

  return { mode, transition, back };
}

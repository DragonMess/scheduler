export function useVisualMode(initial) {
  const [value, setValue] = useState(initial);

  return {
    value,
    onChange: (event) => setValue(event.target.value),
  };
}

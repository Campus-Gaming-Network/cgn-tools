////////////////////////////////////////////////////////////////////////////////
// Source: https://dev.to/gabe_ragland/debouncing-with-react-hooks-jci

// Libraries
const React = require("react");

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

module.exports = {
  useDebounce,
};

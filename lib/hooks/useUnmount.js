////////////////////////////////////////////////////////////////////////////////
// Source: https://github.com/streamich/react-use

// Libraries
const React = require("react");

//Hooks
const useEffectOnce = require("./useEffectOnce");

const useUnmount = (fn) => {
  const fnRef = React.useRef(fn);

  // update the ref each render so if it change the newest callback will be invoked
  fnRef.current = fn;

  useEffectOnce(() => () => fnRef.current());
};

module.exports = {
  useUnmount,
};

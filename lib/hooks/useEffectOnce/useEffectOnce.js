////////////////////////////////////////////////////////////////////////////////
// Source: https://github.com/streamich/react-use

// Libraries
const React = require("react");

const useEffectOnce = (effect) => {
  React.useEffect(effect, []);
};

module.exports = {
  useEffectOnce,
};

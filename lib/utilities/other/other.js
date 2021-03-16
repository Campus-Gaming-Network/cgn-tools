////////////////////////////////////////////////////////////////////////////////
// Other Utilities

const React = require("react");

const { GOOGLE_MAPS_QUERY_URL } = require("../../constants/other");

const useFormFields = (initialState) => {
  const [fields, setValues] = React.useState(initialState);

  return [
    fields,
    (event) => {
      setValues({
        ...fields,
        [event.target.id]: event.target.value,
      });
    },
  ];
};

const noop = () => {};

const isValidUrl = (url) =>
  Boolean(url) && (url.startsWith("http://") || url.startsWith("https://"));

// Move an array element from one array index to another
const move = (array, from, to) => {
  if (from === to) {
    return array;
  }

  const newArray = [...array];

  const target = newArray[from];
  const inc = to < from ? -1 : 1;

  for (let i = from; i !== to; i += inc) {
    newArray[i] = newArray[i + inc];
  }

  newArray[to] = target;

  return newArray;
};

const googleMapsLink = (query) => {
  if (!query) {
    return undefined;
  }

  return `${GOOGLE_MAPS_QUERY_URL}${encodeURIComponent(query)}`;
};

module.exports = {
  useFormFields,
  noop,
  isValidUrl,
  move,
  googleMapsLink,
};

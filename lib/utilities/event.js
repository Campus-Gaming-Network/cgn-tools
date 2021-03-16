////////////////////////////////////////////////////////////////////////////////
// Event Utilities

const { googleMapsLink } = require("./other");
const { buildDateTime, hasStarted, hasEnded } = require("./dateTime");
const { mapSchool } = require("./school");

const mapEvent = (event) => {
  if (!Boolean(event)) {
    return undefined;
  }

  const startDateTime = buildDateTime(event.startDateTime);
  const endDateTime = buildDateTime(event.endDateTime);

  return {
    ...event,
    startDateTime,
    endDateTime,
    googleMapsAddressLink: googleMapsLink(event.location),
    hasStarted: hasStarted(event.startDateTime, event.endDateTime),
    hasEnded: hasEnded(event.endDateTime),
    school: mapSchool(event.school),
    meta: {
      title: event.name,
      description: `${startDateTime.locale}: ${event.description}`.substring(
        0,
        160
      ),
    },
  };
};

module.exports = {
  mapEvent,
};

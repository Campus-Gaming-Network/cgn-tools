////////////////////////////////////////////////////////////////////////////////
// Event Response Utilities

const { mapEvent } = require("./event");
const { mapSchool } = require("./school");
const { mapUser } = require("./user");

const mapEventResponse = (eventResponse) => {
  if (!Boolean(eventResponse)) {
    return undefined;
  }

  return {
    ...eventResponse,
    school: mapSchool(eventResponse.school),
    user: mapUser(eventResponse.user),
    event: mapEvent(eventResponse.event),
  };
};

module.exports = {
  mapEventResponse,
};

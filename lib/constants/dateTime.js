////////////////////////////////////////////////////////////////////////////////
// DateTime Constants

const { DateTime, Info } = require("luxon");
const range = require("lodash.range");

// Utilities
const { getYears } = require("../utilities/dateTime");

const DASHED_DATE = "MMMM-d-y";
const DASHED_DATE_TIME = "MMMM-d-y HH:mm";
const TIMEZONES = [
  { value: "America/Puerto_Rico", name: "Puerto Rico (Atlantic)" },
  { value: "America/New_York", name: "New York (Eastern)" },
  { value: "America/Chicago", name: "Chicago (Central)" },
  { value: "America/Denver", name: "Denver (Mountain)" },
  { value: "America/Phoenix", name: "Phoenix (MST)" },
  { value: "America/Los_Angeles", name: "Los Angeles (Pacific)" },
  { value: "America/Anchorage", name: "Anchorage (Alaska)" },
  { value: "Pacific/Honolulu", name: "Honolulu (Hawaii)" },
];
const CURRENT_YEAR = DateTime.local().year;
const MONTHS = Info.months();
const MAX_DAYS_IN_MONTH = 31;
const DAYS = range(1, MAX_DAYS_IN_MONTH + 1).map((day) => day.toString());
const LAST_100_YEARS = getYears(CURRENT_YEAR - 100, CURRENT_YEAR + 1, {
  reverse: true,
});
const NEXT_5_YEARS = getYears(CURRENT_YEAR, CURRENT_YEAR + 5, {
  reverse: true,
});
const DEFAULT_TIME_INCREMENT = 15;

module.exports = {
  DASHED_DATE,
  DASHED_DATE_TIME,
  TIMEZONES,
  CURRENT_YEAR,
  MONTHS,
  MAX_DAYS_IN_MONTH,
  DAYS,
  LAST_100_YEARS,
  NEXT_5_YEARS,
  DEFAULT_TIME_INCREMENT,
};

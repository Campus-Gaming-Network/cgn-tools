////////////////////////////////////////////////////////////////////////////////
// School Constants

const { ACCOUNTS } = require("../other");

const SCHOOL_EMPTY_UPCOMING_EVENTS_TEXT =
  "This school currently has no upcoming events.";
const SCHOOL_EMPTY_USERS_TEXT = "This school currently has no users.";
const ALLOWED_SCHOOL_ACCOUNTS = [
  "website",
  "twitter",
  "twitch",
  "youtube",
  "skype",
  "discord",
];
const SCHOOL_ACCOUNTS = Object.keys(ACCOUNTS)
  .filter((key) => ALLOWED_SCHOOL_ACCOUNTS.includes(key))
  .reduce((obj, key) => {
    return {
      ...obj,
      [key]: ACCOUNTS[key],
    };
  }, {});
const EMPTY_SCHOOL_WEBSITE = "NOT AVAILABLE";

module.exports = {
  SCHOOL_EMPTY_UPCOMING_EVENTS_TEXT,
  SCHOOL_EMPTY_USERS_TEXT,
  ALLOWED_SCHOOL_ACCOUNTS,
  SCHOOL_ACCOUNTS,
  EMPTY_SCHOOL_WEBSITE,
};

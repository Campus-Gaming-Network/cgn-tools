////////////////////////////////////////////////////////////////////////////////
// Other Constants

// Libraries
const { faGlobe } = require("@fortawesome/free-solid-svg-icons");
const {
  faTwitter,
  faTwitch,
  faYoutube,
  faSkype,
  faDiscord,
  faBattleNet,
  faSteam,
  faXbox,
  faPlaystation,
} = require("@fortawesome/free-brands-svg-icons");

const PRODUCTION_URL = "https://campusgamingnetwork.com/";
const ACCOUNTS = {
  website: {
    label: "Website",
    icon: faGlobe,
  },
  twitter: {
    label: "Twitter",
    icon: faTwitter,
    url: "twitter.com/",
  },
  twitch: {
    label: "Twitch",
    icon: faTwitch,
    url: "twitch.tv/",
  },
  youtube: {
    label: "YouTube",
    icon: faYoutube,
    url: "youtube.com/user/",
  },
  skype: {
    label: "Skype",
    icon: faSkype,
  },
  discord: {
    label: "Discord",
    icon: faDiscord,
  },
  battlenet: {
    label: "Battle.net",
    icon: faBattleNet,
  },
  steam: {
    label: "Steam",
    icon: faSteam,
    url: "steamcommunity.com/id/",
  },
  xbox: {
    label: "Xbox Live",
    icon: faXbox,
  },
  psn: {
    label: "PSN",
    icon: faPlaystation,
  },
};
const DEFAULT_USERS_LIST_PAGE_SIZE = 25;
const DEFAULT_USERS_SKELETON_LIST_PAGE_SIZE = 5;
const DEFAULT_EVENTS_LIST_PAGE_SIZE = 25;
const DEFAULT_EVENTS_SKELETON_LIST_PAGE_SIZE = 3;
const GOOGLE_MAPS_QUERY_URL =
  "https://www.google.com/maps/search/?api=1&query=";
const GRAVATAR = {
  URL: "https://www.gravatar.com/avatar/",
  RA: "pg",
  DEFAULT: "retro",
};
const MAX_DEFAULT_STRING_LENGTH = 255;
const MIN_PASSWORD_LENGTH = 6;
const COOKIES = {
  AUTH_TOKEN:
    process.env.NODE_ENV !== "production"
      ? "cgn_dev.auth_token"
      : "cgn.auth_token",
};
const LOCAL_STORAGE = {
  SCHOOLS:
    process.env.NODE_ENV !== "production" ? "cgn_dev.schools" : "cgn.schools",
  SCHOOLS_QUERY:
    process.env.NODE_ENV !== "production"
      ? "cgn_dev.schools_query"
      : "cgn.schools_query",
};

module.exports = {
  PRODUCTION_URL,
  ACCOUNTS,
  DEFAULT_USERS_LIST_PAGE_SIZE,
  DEFAULT_USERS_SKELETON_LIST_PAGE_SIZE,
  DEFAULT_EVENTS_LIST_PAGE_SIZE,
  DEFAULT_EVENTS_SKELETON_LIST_PAGE_SIZE,
  GOOGLE_MAPS_QUERY_URL,
  GRAVATAR,
  MAX_DEFAULT_STRING_LENGTH,
  MIN_PASSWORD_LENGTH,
  COOKIES,
  LOCAL_STORAGE,
};

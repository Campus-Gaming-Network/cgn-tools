////////////////////////////////////////////////////////////////////////////////
// User Utilities

// Libraries
const intersection = require("lodash.intersection");
const capitalize = require("lodash.capitalize");
const md5 = require("md5");

// Constants
const { GRAVATAR, ACCOUNTS } = require("../../constants/other");

// Utilities
const { mapSchool } = require("../school");
const { buildDateTime } = require("../dateTime");

const createGravatarHash = (email = "") => {
  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    return undefined;
  }

  return md5(trimmedEmail.toLowerCase());
};

const createGravatarRequestUrl = (hash = "", email = "") => {
  if (!hash && Boolean(email)) {
    hash = createGravatarHash(email);
  }

  return `https://www.gravatar.com/avatar/${hash}?s=100&d=${GRAVATAR.DEFAULT}&r=${GRAVATAR.RA}`;
};

const getUserDisplayStatus = (status) =>
  ({ ALUMNI: "Alumni of ", GRAD: "Graduate Student at " }[status] ||
  `${capitalize(status)} at `);

const mapUser = (user) => {
  if (!Boolean(user)) {
    return undefined;
  }

  return {
    ...user,
    birthdate: buildDateTime(user.birthdate),
    school: mapSchool(user.school),
    fullName: `${user.firstName} ${user.lastName}`.trim(),
    hasAccounts: userHasAccounts(user),
    hasFavoriteGames: Boolean(user.favoriteGames && user.favoriteGames.length),
    hasCurrentlyPlaying: Boolean(
      user.currentlyPlaying && user.currentlyPlaying.length
    ),
    displayStatus: getUserDisplayStatus(user.status),
    gravatarUrl: createGravatarRequestUrl(user.gravatar),
  };
};

const userHasAccounts = (user) => {
  if (!user) {
    return false;
  }

  return (
    intersection(Object.keys(ACCOUNTS), Object.keys(user)).filter((key) =>
      Boolean(user[key])
    ).length > 0
  );
};

module.exports = {
  createGravatarHash,
  createGravatarRequestUrl,
  getUserDisplayStatus,
  mapUser,
  userHasAccounts,
};

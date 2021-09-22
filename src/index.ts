import range from 'lodash.range';
import capitalize from 'lodash.capitalize';
import md5 from 'md5';
// import startCase from "lodash.startcase";
import Joi from "joi";

////////////////////////////////////////////////////////////////////////////////
// Firebase

enum FirebaseCollection {
  Schools = 'schools',
  Users = 'users',
  Events = 'events',
  Event_Responses = 'event-responses',
  Game_Queries = 'game-queries',
}
interface FirebaseCollections {
  SCHOOLS: FirebaseCollection.Schools;
  USERS: FirebaseCollection.Users;
  EVENTS: FirebaseCollection.Events;
  EVENT_RESPONSES: FirebaseCollection.Event_Responses;
  GAME_QUERIES: FirebaseCollection.Game_Queries;
}
export const COLLECTIONS: FirebaseCollections = {
  SCHOOLS: FirebaseCollection.Schools,
  USERS: FirebaseCollection.Users,
  EVENTS: FirebaseCollection.Events,
  EVENT_RESPONSES: FirebaseCollection.Event_Responses,
  GAME_QUERIES: FirebaseCollection.Game_Queries,
};

////////////////////////////////////////////////////////////////////////////////
// IGDB

export const IGDB_GAME_URL: string = 'https://www.igdb.com/games';

////////////////////////////////////////////////////////////////////////////////
// School

export const SCHOOL_EMPTY_UPCOMING_EVENTS_TEXT: string = 'This school currently has no upcoming events.';
export const SCHOOL_EMPTY_USERS_TEXT: string = 'This school currently has no users.';
enum SchoolAccount {
  Website = 'website',
  Twitter = 'twitter',
  Twitch = 'twitch',
  YouTube = 'youtube',
  Skype = 'skype',
  Discord = 'discord',
}
export const ALLOWED_SCHOOL_ACCOUNTS: SchoolAccount[] = [
  SchoolAccount.Website,
  SchoolAccount.Twitter,
  SchoolAccount.Twitch,
  SchoolAccount.YouTube,
  SchoolAccount.Skype,
  SchoolAccount.Discord,
];
export const EMPTY_SCHOOL_WEBSITE: string = 'NOT AVAILABLE';
export const getSchoolLogoPath = (schoolId: string | number, extension: string = 'png'): string =>
  `schools/${schoolId}/images/logo.${extension}`;
export const getSchoolLogoUrl = (schoolId: string | number, extension: string = 'png'): string =>
  `https://firebasestorage.googleapis.com/v0/b/${
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
  }/o/${encodeURIComponent(getSchoolLogoPath(schoolId, extension))}?alt=media&token=${schoolId}`;

////////////////////////////////////////////////////////////////////////////////
// User

interface User {
  id: string;
  firstName: string;
  lastName: string;
  status: string;
  gravatar: string;
  school: {
    ref: string;
    id: string;
  };
  major: string;
  minor: string;
  bio: string;
  timezone: string;
  hometown: string;
  birthdate: string;
  twitter: string;
  twitch: string;
  youtube: string;
  skype: string;
  discord: string;
  battlenet: string;
  steam: string;
  xbox: string;
  psn: string;
  currentlyPlaying: [];
  favoriteGames: [];
}
export const BASE_USER: User = {
  id: '',
  firstName: '',
  lastName: '',
  status: '',
  gravatar: '',
  school: {
    ref: '',
    id: '',
  },
  major: '',
  minor: '',
  bio: '',
  timezone: '',
  hometown: '',
  birthdate: '',
  twitter: '',
  twitch: '',
  youtube: '',
  skype: '',
  discord: '',
  battlenet: '',
  steam: '',
  xbox: '',
  psn: '',
  currentlyPlaying: [],
  favoriteGames: [],
};
interface StudentStatusOption {
  value: string;
  label: string;
}
export const STUDENT_STATUS_OPTIONS: StudentStatusOption[] = [
  { value: '', label: 'Select your status' },
  { value: 'FRESHMAN', label: 'Freshman' },
  { value: 'SOPHMORE', label: 'Sophmore' },
  { value: 'JUNIOR', label: 'Junior' },
  { value: 'SENIOR', label: 'Senior' },
  { value: 'GRAD', label: 'Grad' },
  { value: 'ALUMNI', label: 'Alumni' },
  { value: 'FACULTY', label: 'Faculty' },
  { value: 'OTHER', label: 'Other' },
];
export const USER_EMPTY_ACCOUNTS_TEXT: string = 'This user has not added any accounts.';
export const USER_EMPTY_CURRENTLY_PLAYING_TEXT: string = 'This user has not added any games.';
export const USER_EMPTY_FAVORITE_GAMES_TEXT: string = 'This user has not added any games.';
export const USER_EMPTY_UPCOMING_EVENTS_TEXT: string = 'This user is currently not attending any upcoming events.';
export const MAX_FAVORITE_GAME_LIST: number = 5;
export const MAX_CURRENTLY_PLAYING_LIST: number = 5;
export const MAX_BIO_LENGTH: number = 2500;
export const DELETE_USER_VERIFICATION_TEXT: string = 'DELETE';
export const createGravatarHash = (email: string = ''): string => {
  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    return '';
  }

  return md5(trimmedEmail.toLowerCase());
};

export const createGravatarRequestUrl = (hash: string = '', email: string = ''): string => {
  if (!hash && Boolean(email)) {
    hash = createGravatarHash(email);
  }

  return `https://www.gravatar.com/avatar/${hash}?s=100&d=${GRAVATAR.DEFAULT}&r=${GRAVATAR.RA}`;
};
export const getUserDisplayStatus = (status: string): string =>
  ({ ALUMNI: 'Alumni of ', GRAD: 'Graduate Student at ' }[status] || `${capitalize(status)} at `);

////////////////////////////////////////////////////////////////////////////////
// Other

export const PRODUCTION_URL: string = 'https://campusgamingnetwork.com/';
export const DEFAULT_PAGE_SIZE: number = 25;
export const DEFAULT_USERS_LIST_PAGE_SIZE: number = DEFAULT_PAGE_SIZE;
export const DEFAULT_USERS_SKELETON_LIST_PAGE_SIZE: number = 5;
export const DEFAULT_EVENTS_LIST_PAGE_SIZE: number = DEFAULT_PAGE_SIZE;
export const DEFAULT_EVENTS_SKELETON_LIST_PAGE_SIZE: number = 3;
export const GOOGLE_MAPS_QUERY_URL: string = 'https://www.google.com/maps/search/?api=1&query=';
export const MAX_DEFAULT_STRING_LENGTH: number = 255;
export const MIN_PASSWORD_LENGTH: number = 6;
interface Gravatar {
  URL: string;
  RA: string;
  DEFAULT: string;
}
export const GRAVATAR: Gravatar = {
  URL: 'https://www.gravatar.com/avatar/',
  RA: 'pg',
  DEFAULT: 'retro',
};
interface SocialAccount {
  label: string;
  url: string;
}
export const isValidUrl = (url: string): boolean =>
  Boolean(url) && (url.startsWith('http://') || url.startsWith('https://'));
export const googleMapsLink = (query: string): string => {
  if (!query) {
    return '';
  }

  return `${GOOGLE_MAPS_QUERY_URL}${encodeURIComponent(query)}`;
};
// Move an array element from one array index to another
export const move = (array: any[], from: number, to: number): any[] => {
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

////////////////////////////////////////////////////////////////////////////////
// DateTime

export const DASHED_DATE: string = 'MMMM-d-y';
export const DASHED_DATE_TIME: string = 'MMMM-d-y HH:mm';
interface Timezone {
  value: string;
  name: string;
}
export const TIMEZONES: Timezone[] = [
  { value: 'America/Puerto_Rico', name: 'Puerto Rico (Atlantic)' },
  { value: 'America/New_York', name: 'New York (Eastern)' },
  { value: 'America/Chicago', name: 'Chicago (Central)' },
  { value: 'America/Denver', name: 'Denver (Mountain)' },
  { value: 'America/Phoenix', name: 'Phoenix (MST)' },
  { value: 'America/Los_Angeles', name: 'Los Angeles (Pacific)' },
  { value: 'America/Anchorage', name: 'Anchorage (Alaska)' },
  { value: 'Pacific/Honolulu', name: 'Honolulu (Hawaii)' },
];
export const MAX_DAYS_IN_MONTH: number = 31;
export const DEFAULT_TIME_INCREMENT: number = 15;
export const DAYS = range(1, MAX_DAYS_IN_MONTH + 1).map((day: number) => day.toString());

////////////////////////////////////////////////////////////////////////////////
// Event

export const EVENT_EMPTY_USERS_TEXT: string = 'This event currently has no attending users.';
export const EVENT_EMPTY_LOCATION_TEXT: string = 'To be determined';
export const MAX_DESCRIPTION_LENGTH: number = 5000;

////////////////////////////////////////////////////////////////////////////////
// Event Response

enum EventResponse {
  Yes = 'YES',
  No = 'NO',
}
interface EventResponses {
  YES: EventResponse.Yes;
  NO: EventResponse.No;
}
export const EVENT_RESPONSES: EventResponses = {
  YES: EventResponse.Yes,
  NO: EventResponse.No,
};

////////////////////////////////////////////////////////////////////////////////
// Style Utilities

export const classNames = (_classNames: string[] = []): string => {
  return _classNames
    .map((str: string) => str.trim())
    .filter((str) => str)
    .join(' ')
    .trim();
};

////////////////////////////////////////////////////////////////////////////////
// Validations

export const BASE_STRING_MAX_LENGTH = 255;
export const idSchema = Joi.string().alphanum().max(BASE_STRING_MAX_LENGTH).required();
export const refSchema = Joi.string().alphanum().max(BASE_STRING_MAX_LENGTH).required();
export const createdAtSchema = Joi.date().timestamp().allow('');
export const updatedAtSchema = Joi.date().timestamp().allow('');
export const userStatusSchema = Joi.array().items(Joi.string().valid(...STUDENT_STATUS_OPTIONS.map(o => o && o.value))).required();
export const subEventSchema = Joi.object({
  id: idSchema,
  name: Joi.string().alphanum().max(BASE_STRING_MAX_LENGTH).required(),
  responses: Joi.object({
    yes: Joi.number().integer().positive().required(),
    no: Joi.number().integer().positive().required(),
  }),
  description: Joi.string().alphanum().max(5000).allow(''),
  isOnlineEvent: Joi.boolean(),
  startDateTime: Joi.date().timestamp().allow(''),
  endDateTime: Joi.date().timestamp().allow(''),
  ref: refSchema,
});
export const subTeamSchema = Joi.object({
  id: idSchema,
  name: Joi.string().alphanum().max(BASE_STRING_MAX_LENGTH).required(),
  shortName: Joi.string().alphanum().max(BASE_STRING_MAX_LENGTH).allow(''),
  ref: refSchema,
});
export const subSchoolSchema = Joi.object({
  id: idSchema,
  name: Joi.string().alphanum().max(BASE_STRING_MAX_LENGTH).required(),
  ref: refSchema,
});
export const subUserSchema = Joi.object({
  id: idSchema,
  firstName: Joi.string().alphanum().max(BASE_STRING_MAX_LENGTH).required(),
  lastName: Joi.string().alphanum().max(BASE_STRING_MAX_LENGTH).required(),
  gravatar: Joi.string().alphanum().max(BASE_STRING_MAX_LENGTH).required(),
  ref: refSchema,
  status: userStatusSchema,
  school: subSchoolSchema,
});
export const gameSchema = Joi.object({
  id: idSchema,
  name: Joi.string().alphanum().max(BASE_STRING_MAX_LENGTH).required(),
  slug: Joi.string().alphanum().max(BASE_STRING_MAX_LENGTH).required(),
  cover: Joi.object({
    id: Joi.string().alphanum().max(BASE_STRING_MAX_LENGTH).allow(''),
    url: Joi.string().alphanum().max(BASE_STRING_MAX_LENGTH).allow(''),
  }),
});
export const userSchema = Joi.object({
  id: idSchema,
  firstName: Joi.string().alphanum().max(BASE_STRING_MAX_LENGTH).required(),
  lastName: Joi.string().alphanum().max(BASE_STRING_MAX_LENGTH).required(),
  status: userStatusSchema,
  gravatar: Joi.string().alphanum().max(BASE_STRING_MAX_LENGTH).required(),
  school: subSchoolSchema,
  createdAt: createdAtSchema,
  updatedAt: updatedAtSchema,
  major: Joi.string().alphanum().max(BASE_STRING_MAX_LENGTH).allow(''),
  minor: Joi.string().alphanum().max(BASE_STRING_MAX_LENGTH).allow(''),
  bio: Joi.string().alphanum().max(BASE_STRING_MAX_LENGTH).allow(''),
  timezone: Joi.array().items(Joi.string().valid(...TIMEZONES.map(tz => tz && tz.value))).allow(''),
  hometown: Joi.string().alphanum().max(BASE_STRING_MAX_LENGTH).allow(''),
  birthdate: Joi.date().timestamp().allow(''),
  website: Joi.string().alphanum().max(BASE_STRING_MAX_LENGTH).allow(''),
  twitter: Joi.string().alphanum().max(BASE_STRING_MAX_LENGTH).allow(''),
  twitch: Joi.string().alphanum().max(BASE_STRING_MAX_LENGTH).allow(''),
  youtube: Joi.string().alphanum().max(BASE_STRING_MAX_LENGTH).allow(''),
  skype: Joi.string().alphanum().max(BASE_STRING_MAX_LENGTH).allow(''),
  discord: Joi.string().alphanum().max(BASE_STRING_MAX_LENGTH).allow(''),
  battlenet: Joi.string().alphanum().max(BASE_STRING_MAX_LENGTH).allow(''),
  steam: Joi.string().alphanum().max(BASE_STRING_MAX_LENGTH).allow(''),
  xbox: Joi.string().alphanum().max(BASE_STRING_MAX_LENGTH).allow(''),
  psn: Joi.string().alphanum().max(BASE_STRING_MAX_LENGTH).allow(''),
  currentlyPlaying: Joi.array().items(gameSchema).max(5).allow([]),
  favoriteGames: Joi.array().items(gameSchema).max(5).allow([]),
});
export const schoolSchema = Joi.object({
  id: idSchema,
  name: Joi.string().alphanum().max(BASE_STRING_MAX_LENGTH).required(),
  handle: Joi.string().alphanum().max(BASE_STRING_MAX_LENGTH).allow(''),
  email: Joi.string().alphanum().max(BASE_STRING_MAX_LENGTH).allow(''),
  city: Joi.string().alphanum().max(BASE_STRING_MAX_LENGTH).allow(''),
  country: Joi.string().alphanum().max(BASE_STRING_MAX_LENGTH).allow(''),
  county: Joi.string().alphanum().max(BASE_STRING_MAX_LENGTH).allow(''),
  address: Joi.string().alphanum().max(BASE_STRING_MAX_LENGTH).allow(''),
  state: Joi.string().alphanum().max(BASE_STRING_MAX_LENGTH).allow(''),
  geohash: Joi.string().alphanum().max(BASE_STRING_MAX_LENGTH).allow(''),
  website: Joi.string().alphanum().max(BASE_STRING_MAX_LENGTH).allow(''),
  phone: Joi.string().alphanum().max(BASE_STRING_MAX_LENGTH).allow(''),
  zip: Joi.string().alphanum().max(BASE_STRING_MAX_LENGTH).allow(''),
  location: Joi.object().allow(''),
  createdAt: createdAtSchema,
  updatedAt: updatedAtSchema,
});
export const eventSchema = Joi.object({
  id: idSchema,
  name: Joi.string().alphanum().max(BASE_STRING_MAX_LENGTH).required(),
  creator: subUserSchema,
  school: subSchoolSchema,
  responses: Joi.object({
    yes: Joi.number().integer().positive().required(),
    no: Joi.number().integer().positive().required(),
  }).required(),
  description: Joi.string().alphanum().max(5000).allow(''),
  isOnlineEvent: Joi.boolean(),
  startDateTime: Joi.date().timestamp().allow(''),
  endDateTime: Joi.date().timestamp().allow(''),
  createdAt: createdAtSchema,
  updatedAt: updatedAtSchema,
});
export const eventResponseSchema = Joi.object({
  event: subEventSchema,
  school: subSchoolSchema,
  user: subUserSchema,
  response: Joi.string().valid('YES', 'NO').required(),
  createdAt: createdAtSchema,
  updatedAt: updatedAtSchema,
});
export const teamSchema = Joi.object({
  id: idSchema,
  name: Joi.string().alphanum().max(BASE_STRING_MAX_LENGTH).required(),
  shortName: Joi.string().alphanum().max(BASE_STRING_MAX_LENGTH).allow(''),
  website: Joi.string().alphanum().max(BASE_STRING_MAX_LENGTH).allow(''),
  description: Joi.string().alphanum().max(5000).allow(''),
  memberCount: Joi.number().integer().positive().required(),
  roles: Joi.object({
    leader: Joi.object({ id: idSchema, ref: refSchema }).required(),
    officer: Joi.object({ id: idSchema, ref: refSchema }),
  }),
  createdAt: createdAtSchema,
  updatedAt: updatedAtSchema,
});
export const teammateSchema = Joi.object({
  team: subTeamSchema,
  user: subUserSchema,
  createdAt: createdAtSchema,
  updatedAt: updatedAtSchema,
});
export const validateCreateUser = (form: {}) => userSchema.validate(form);
export const validateEditUser = (form: {}) => userSchema.validate(form);
export const validateCreateEvent = (form: {}) => eventSchema.validate(form);
export const validateEditEvent = (form: {}) => eventSchema.validate(form);
export const validateEditSchool = (form: {}) => schoolSchema.validate(form);
export const validateCreateTeam = (form: {}) => eventSchema.validate(form);
export const validateEditTeam = (form: {}) => eventSchema.validate(form);

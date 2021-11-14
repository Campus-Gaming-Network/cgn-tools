import range from 'lodash.range';
import capitalize from 'lodash.capitalize';
import md5 from 'md5';
import startCase from 'lodash.startcase';
import Joi from 'joi';
import { customAlphabet } from 'nanoid';
import Filter from 'bad-words';
import { DateTime, Interval } from 'luxon';
import { Timestamp as FirestoreTimestamp, GeoPoint as FirestoreGeoPoint } from '@firebase/firestore-types';

////////////////////////////////////////////////////////////////////////////////
// Firebase

enum FirebaseCollection {
  Schools = 'schools',
  Users = 'users',
  Events = 'events',
  Event_Responses = 'event-responses',
  Game_Queries = 'game-queries',
  Configs = 'configs',
  Reports = 'reports',
  Teams = 'teams',
  Teams_Auth = 'teams-auth',
  Teammates = 'teammates',
  Tournaments = 'tournaments',
  Tournament_User = 'tournament-user',
}
interface FirebaseCollections {
  SCHOOLS: FirebaseCollection.Schools;
  USERS: FirebaseCollection.Users;
  EVENTS: FirebaseCollection.Events;
  EVENT_RESPONSES: FirebaseCollection.Event_Responses;
  GAME_QUERIES: FirebaseCollection.Game_Queries;
  CONFIGS: FirebaseCollection.Configs;
  REPORTS: FirebaseCollection.Reports;
  TEAMS: FirebaseCollection.Teams;
  TEAMS_AUTH: FirebaseCollection.Teams_Auth;
  TEAMMATES: FirebaseCollection.Teammates;
  TOURNAMENTS: FirebaseCollection.Tournaments;
  TOURNAMENT_USER: FirebaseCollection.Tournament_User;
}
export const COLLECTIONS: FirebaseCollections = {
  SCHOOLS: FirebaseCollection.Schools,
  USERS: FirebaseCollection.Users,
  EVENTS: FirebaseCollection.Events,
  EVENT_RESPONSES: FirebaseCollection.Event_Responses,
  GAME_QUERIES: FirebaseCollection.Game_Queries,
  CONFIGS: FirebaseCollection.Configs,
  REPORTS: FirebaseCollection.Reports,
  TEAMS: FirebaseCollection.Teams,
  TEAMS_AUTH: FirebaseCollection.Teams_Auth,
  TEAMMATES: FirebaseCollection.Teammates,
  TOURNAMENTS: FirebaseCollection.Tournaments,
  TOURNAMENT_USER: FirebaseCollection.Tournament_User,
};
enum FirebaseCallable {
  Search_Games = 'searchGames',
  Search_Schools = 'searchSchools',
  Report_Entity = 'reportEntity',
  Create_Team = 'createTeam',
  Join_Team = 'joinTeam',
  Edit_Team = 'editTeam',
  Leave_Team = 'leaveTeam',
  Kick_Teammate = 'kickTeammate',
  Promote_Teammate = 'promoteTeammate',
  Demote_Teammate = 'demoteTeammate',
  Create_Tournament = 'createTournament',
}
interface FirebaseCallables {
  SEARCH_GAMES: FirebaseCallable.Search_Games;
  SEARCH_SCHOOLS: FirebaseCallable.Search_Schools;
  REPORT_ENTITY: FirebaseCallable.Report_Entity;
  CREATE_TEAM: FirebaseCallable.Create_Team;
  JOIN_TEAM: FirebaseCallable.Join_Team;
  EDIT_TEAM: FirebaseCallable.Edit_Team;
  LEAVE_TEAM: FirebaseCallable.Leave_Team;
  KICK_TEAMMATE: FirebaseCallable.Kick_Teammate;
  PROMOTE_TEAMMATE: FirebaseCallable.Promote_Teammate;
  DEMOTE_TEAMMATE: FirebaseCallable.Demote_Teammate;
  CREATE_TOURNAMENT: FirebaseCallable.Create_Tournament;
}
export const CALLABLES: FirebaseCallables = {
  SEARCH_GAMES: FirebaseCallable.Search_Games,
  SEARCH_SCHOOLS: FirebaseCallable.Search_Schools,
  REPORT_ENTITY: FirebaseCallable.Report_Entity,
  CREATE_TEAM: FirebaseCallable.Create_Team,
  JOIN_TEAM: FirebaseCallable.Join_Team,
  EDIT_TEAM: FirebaseCallable.Edit_Team,
  LEAVE_TEAM: FirebaseCallable.Leave_Team,
  KICK_TEAMMATE: FirebaseCallable.Kick_Teammate,
  PROMOTE_TEAMMATE: FirebaseCallable.Promote_Teammate,
  DEMOTE_TEAMMATE: FirebaseCallable.Demote_Teammate,
  CREATE_TOURNAMENT: FirebaseCallable.Create_Tournament,
};
enum FirebaseAuthAction {
  Verify_Email = 'verifyEmail',
  Reset_Password = 'resetPassword',
}
interface FirebaseAuthActions {
  VERIFY_EMAIL: FirebaseAuthAction.Verify_Email;
  RESET_PASSWORD: FirebaseAuthAction.Reset_Password;
}
export const AUTH_ACTION: FirebaseAuthActions = {
  VERIFY_EMAIL: FirebaseAuthAction.Verify_Email,
  RESET_PASSWORD: FirebaseAuthAction.Reset_Password,
};
type DocumentPath = `${string}/{${string}Id}`;
interface DocumentPaths {
  USER: DocumentPath;
  SCHOOL: DocumentPath;
  EVENT_RESPONSES: DocumentPath;
  TEAM: DocumentPath;
  TEAMMATES: DocumentPath;
  TOURNAMENTS: DocumentPath;
  TOURNAMENT_USER: DocumentPath;
}
export const DOCUMENT_PATHS: DocumentPaths = {
  USER: 'users/{userId}',
  SCHOOL: 'schools/{schoolId}',
  EVENT_RESPONSES: 'event-responses/{eventResponseId}',
  TEAM: 'teams/{teamId}',
  TEAMMATES: 'teammates/{teammatesId}',
  TOURNAMENTS: 'tournaments/{tournamentId}',
  TOURNAMENT_USER: 'tournament-user/{tournamentUserId}',
};
type FirestoreRef = string | object;

////////////////////////////////////////////////////////////////////////////////
// IGDB

export const IGDB_GAME_URL: string = 'https://www.igdb.com/games';

////////////////////////////////////////////////////////////////////////////////
// School

interface FirestoreSchoolDoc {
  id: string;
  name: string;
  handle: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  county?: string;
  zip?: string;
  geohash?: string;
  phone?: string;
  website?: string;
  location?: FirestoreGeoPoint;
  createdAt?: FirestoreTimestamp;
  updatedAt?: FirestoreTimestamp;
}
interface FirestoreSchoolSubDoc {
  id: string;
  name: string;
  ref: FirestoreRef;
  createdAt?: FirestoreTimestamp;
  updatedAt?: FirestoreTimestamp;
}
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
export const getSchoolLogoPath = (schoolId: string | number, extension: string = 'png'): string => {
  return `schools/${schoolId}/images/logo.${extension}`;
};
export const getSchoolLogoUrl = (schoolId: string | number, extension: string = 'png'): string => {
  return `https://firebasestorage.googleapis.com/v0/b/${
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
  }/o/${encodeURIComponent(getSchoolLogoPath(schoolId, extension))}?alt=media&token=${schoolId}`;
};
export const formatSchoolName = (schoolName: string): string => {
  return startCase(schoolName.toLowerCase());
};
export const getSchoolUrl = (schoolId: string): string => {
  return `${PRODUCTION_URL}/school/${schoolId}`;
};
export const mapSchool = (school: FirestoreSchoolDoc): object | undefined => {
  if (!Boolean(school)) {
    return undefined;
  }

  const formattedName = formatSchoolName(school.name);
  const url = getSchoolUrl(school.id);

  return cleanObjectOfBadWords({
    ...school,
    createdAt: school.createdAt?.toDate(),
    updatedAt: school.updatedAt?.toDate(),
    formattedName,
    formattedAddress: startCase(school.address ? school.address.toLowerCase() : ''),
    isValidWebsiteUrl: isValidUrl(school.website || ''),
    googleMapsAddressLink:
      Boolean(school.address) && Boolean(school.city) && Boolean(school.state)
        ? googleMapsLink(`${school.address} ${school.city}, ${school.state}`)
        : undefined,
    url,
    meta: {
      title: formattedName,
      og: {
        url,
      },
    },
  });
};
export const mapSubSchool = (school: FirestoreSchoolSubDoc): object | undefined => {
  if (!Boolean(school)) {
    return undefined;
  }

  const formattedName = formatSchoolName(school.name);
  const url = getSchoolUrl(school.id);

  return cleanObjectOfBadWords({
    ...school,
    formattedName,
    url,
  });
};

////////////////////////////////////////////////////////////////////////////////
// User

interface FirestoreUserDoc {
  id: string;
  firstName: string;
  lastName: string;
  status: string;
  gravatar: string;
  school: FirestoreSchoolSubDoc;
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
  createdAt?: FirestoreTimestamp;
  updatedAt?: FirestoreTimestamp;
}
interface FirestoreUserSubDoc {
  id: string;
  firstName: string;
  lastName: string;
  status: string;
  gravatar: string;
  ref: FirestoreRef;
  school: FirestoreSchoolSubDoc;
  createdAt?: FirestoreTimestamp;
  updatedAt?: FirestoreTimestamp;
}
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
// Team

interface FirestoreTeamDoc {
  id: string;
  name: string;
  shortName: string;
  website: string;
  description: string;
  memberCount: number;
  roles: FirestoreTeamRoles;
  createdAt?: FirestoreTimestamp;
  updatedAt?: FirestoreTimestamp;
}
interface FirestoreTeamRoles {
  leader: FirestoreTeamRole;
  officer?: FirestoreTeamRole;
}
interface FirestoreTeamRole {
  id: string;
  ref: FirestoreRef;
}
interface FirestoreTeamSubDoc {
  id: string;
  name: string;
  shortName: string;
  ref: FirestoreRef;
}
interface TeamRoleTypes {
  LEADER: string;
  OFFICER: string;
}
export const TEAM_ROLE_TYPES: TeamRoleTypes = {
  LEADER: 'leader',
  OFFICER: 'officer',
};

////////////////////////////////////////////////////////////////////////////////
// Teammate

interface FirestoreTeammateDoc {
  user: FirestoreUserSubDoc;
  team: FirestoreTeamSubDoc;
}

////////////////////////////////////////////////////////////////////////////////
// Role

interface FirestoreRoleDoc {
  id: string;
  name: string;
  permissions: [];
}

////////////////////////////////////////////////////////////////////////////////
// User Role

interface FirestoreUserRoleDoc {
  role: {
    id: string;
    ref: FirestoreRef;
  };
  team: {
    id: string;
    ref: FirestoreRef;
  };
  user: {
    id: string;
    ref: FirestoreRef;
  };
}

////////////////////////////////////////////////////////////////////////////////
// Team Auth

interface FirestoreTeamAuthDoc {
  joinHash: string;
  team: {
    id: string;
    ref: FirestoreRef;
  };
  createdAt?: FirestoreTimestamp;
  updatedAt?: FirestoreTimestamp;
}

////////////////////////////////////////////////////////////////////////////////
// Game Query

interface FirestoreGameQueryDoc {
  games: FirestoreGame[];
  queries: number;
  createdAt?: FirestoreTimestamp;
  updatedAt?: FirestoreTimestamp;
}

////////////////////////////////////////////////////////////////////////////////
// Other

export const COOKIES = {
  PATH: '/',
  AUTH_TOKEN: process.env.NODE_ENV !== 'production' ? 'cgn_dev.auth_token' : 'cgn.auth_token',
};
export const LOCAL_STORAGE = {
  SCHOOLS: process.env.NODE_ENV !== 'production' ? 'cgn_dev.schools' : 'cgn.schools',
  SCHOOLS_QUERY: process.env.NODE_ENV !== 'production' ? 'cgn_dev.schools_query' : 'cgn.schools_query',
  GEOLOCATION: 'cgn.geolocation',
};
export const CGN_TWITTER_HANDLE: string = '@CampusGamingNet';
export const SITE_NAME: string = 'Campus Gaming Network';
interface RedirectHome {
  redirect: {
    permanent: boolean;
    destination: string;
  };
}
export const REDIRECT_HOME: RedirectHome = {
  redirect: {
    permanent: false,
    destination: '/',
  },
};
interface NotFound {
  notFound: boolean;
}
export const NOT_FOUND: NotFound = { notFound: true };
// Source: https://dev.twitch.tv/docs/embed/everything
export const TWITCH_EMBED_SCRIPT_URL: string = 'https://embed.twitch.tv/embed/v1.js';
export const DISCORD_LINK: string = 'https://discord.gg/dpYU6TY';
export const GITHUB_LINK: string = 'https://github.com/Campus-Gaming-Network/campus-gaming-network';
export const FACEBOOK_LINK: string = 'https://www.facebook.com/campusgamingnetwork/';
export const TWITTER_LINK: string = 'https://twitter.com/CampusGamingNet';
export const INSTAGRAM_LINK: string = 'https://www.instagram.com/campusgamingnetwork/';
export const SUPPORT_EMAIL: string = 'support@campusgamingnetwork.com';
export const BUY_ME_A_COFFEE_LINK: string = 'https://www.buymeacoffee.com/cgnbrandon';
export const BASE_ERROR_MESSAGE: string = `Please contact us at ${SUPPORT_EMAIL}, we are sorry for the inconvenience.`;
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
export const isValidUrl = (url: string): boolean => {
  if (!Boolean(url) || typeof url !== 'string') {
    return false;
  }

  return url.startsWith('http://') || url.startsWith('https://');
};
export const isValidEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const googleMapsLink = (query: string | undefined): string => {
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
export const shallowEqual = (object1: { [key: string]: unknown }, object2: { [key: string]: unknown }): boolean => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }

  return true;
};
const badWordFilter = new Filter();
export const cleanBadWords = (text: string): string => badWordFilter.clean(text);
// NOTE: This method mutates the original object, otherwise the `delete` would not work.
export const sanitizePrivateProperties = (obj: { [key: string]: any }): { [key: string]: any } => {
  for (const prop in obj) {
    // Assuming a private property starts with an underscore.
    // In the case of Firebase ref properties, they do.
    if (prop.startsWith('_')) {
      delete obj[prop];
    } else if (typeof obj[prop] === 'object') {
      sanitizePrivateProperties(obj[prop]);
    }
  }

  return obj;
};

export const cleanObjectOfBadWords = (obj: { [key: string]: any }): { [key: string]: any } => {
  const _obj = { ...obj };

  for (const prop in _obj) {
    // Assuming a private property starts with an underscore.
    // In the case of Firebase ref properties, they do.
    if (!prop.startsWith('_') && typeof _obj[prop] === 'string' && _obj[prop].trim() !== '') {
      cleanBadWords(_obj[prop]);
    } else if (['meta', 'school', 'user', 'event', 'twitter', 'og'].includes(prop)) {
      cleanObjectOfBadWords(_obj[prop]);
    }
  }

  return _obj;
};

////////////////////////////////////////////////////////////////////////////////
// Challonge

export const CHALLONGE_API_URL: string = 'https://api.challonge.com/v1/';

////////////////////////////////////////////////////////////////////////////////
// Nanoid

export const NANO_ALPHABET: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
export const NANO_ID_LENGTH: number = 10;
export const nanoid = customAlphabet(NANO_ALPHABET, NANO_ID_LENGTH);

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
export const hasStarted = (startDateTime: FirestoreTimestamp, endDateTime: FirestoreTimestamp): boolean => {
  if (!Boolean(startDateTime) || !Boolean(endDateTime)) {
    return false;
  }

  return Interval.fromDateTimes(startDateTime.toDate(), endDateTime.toDate()).contains(DateTime.local());
};
export const hasEnded = (endDateTime: FirestoreTimestamp): boolean => {
  if (!Boolean(endDateTime)) {
    return false;
  }

  return DateTime.local() > DateTime.fromISO(endDateTime.toDate().toISOString());
};

////////////////////////////////////////////////////////////////////////////////
// Event

interface FirestoreEventDoc {
  id: string;
  name: string;
  creator: FirestoreUserSubDoc;
  school: FirestoreSchoolSubDoc;
  responses: {
    yes: number;
    no: number;
  };
  description: string;
  isOnlineEvent: boolean;
  game: FirestoreGame;
  placeId?: string;
  location?: string;
  pageViews?: number;
  startDateTime: FirestoreTimestamp;
  endDateTime: FirestoreTimestamp;
  createdAt?: FirestoreTimestamp;
  updatedAt?: FirestoreTimestamp;
}
interface FirestoreEventSubDoc {
  id: string;
  name: string;
  ref: FirestoreRef;
  description: string;
  responses: {
    yes: number;
    no: number;
  };
  startDateTime: FirestoreTimestamp;
  endDateTime: FirestoreTimestamp;
  isOnlineEvent: boolean;
  game: FirestoreGame;
  createdAt?: FirestoreTimestamp;
  updatedAt?: FirestoreTimestamp;
}
interface FirestoreGame {
  id: number;
  cover: {
    id: number;
    url: string;
  };
  name: string;
  slug: string;
}
export const EVENT_EMPTY_USERS_TEXT: string = 'This event currently has no attending users.';
export const EVENT_EMPTY_LOCATION_TEXT: string = 'To be determined';
export const MAX_DESCRIPTION_LENGTH: number = 5000;
export const getEventUrl = (eventId: string): string => {
  return `${PRODUCTION_URL}/event/${eventId}`;
};
export const getEventMetaDescription = (event: FirestoreEventDoc): string => {
  return `${event.startDateTime.toDate()}: ${event.description}`;
};
export const mapEvent = (event: FirestoreEventDoc): object | undefined => {
  if (!Boolean(event)) {
    return undefined;
  }

  const metaDescription = getEventMetaDescription(event);
  const url = getEventUrl(event.id);

  return cleanObjectOfBadWords({
    ...event,
    createdAt: event.createdAt?.toDate(),
    updatedAt: event.updatedAt?.toDate(),
    url,
    googleMapsAddressLink: googleMapsLink(event.location),
    hasStarted: hasStarted(event.startDateTime, event.endDateTime),
    hasEnded: hasEnded(event.endDateTime),
    school: mapSubSchool(event.school),
    meta: {
      title: event.name,
      description: metaDescription.substring(0, 155),
      twitter: {
        card: 'summary',
        site: SITE_NAME,
        title: event.name,
        description: metaDescription.substring(0, 200),
        creator: CGN_TWITTER_HANDLE,
      },
      og: {
        title: event.name,
        type: 'article',
        url,
        description: metaDescription,
        site_name: SITE_NAME,
      },
    },
  });
};
export const mapSubEvent = (event: FirestoreEventSubDoc): object | undefined => {
  if (!Boolean(event)) {
    return undefined;
  }

  const url = getEventUrl(event.id);

  return cleanObjectOfBadWords({
    ...event,
    url,
    hasStarted: hasStarted(event.startDateTime, event.endDateTime),
    hasEnded: hasEnded(event.endDateTime),
  });
};
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
interface FirestoreEventResponseDoc {
  response: EventResponse;
  user: FirestoreUserSubDoc;
  event: FirestoreEventSubDoc;
  school: FirestoreSchoolSubDoc;
  createdAt?: FirestoreTimestamp;
  updatedAt?: FirestoreTimestamp;
}

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

export const validateOptions = {
  abortEarly: false,
  debug: process.env.NODE_ENV !== 'production',
};
export const BASE_STRING_MAX_LENGTH = 255;
export const idSchema = Joi.string().alphanum().max(BASE_STRING_MAX_LENGTH).required();
export const refSchema = Joi.string().alphanum().max(BASE_STRING_MAX_LENGTH).required();
export const createdAtSchema = Joi.date().timestamp().allow('');
export const updatedAtSchema = Joi.date().timestamp().allow('');
export const emailSchema = Joi.string().email({ tlds: { allow: false } });
export const passwordSchema = Joi.string().alphanum().min(MIN_PASSWORD_LENGTH);
export const userStatusSchema = Joi.array().items(
  Joi.string().valid(...STUDENT_STATUS_OPTIONS.map((o) => o && o.value)),
);
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
  status: userStatusSchema.required(),
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
  status: userStatusSchema.required(),
  gravatar: Joi.string().alphanum().max(BASE_STRING_MAX_LENGTH).required(),
  school: subSchoolSchema,
  createdAt: createdAtSchema,
  updatedAt: updatedAtSchema,
  major: Joi.string().alphanum().max(BASE_STRING_MAX_LENGTH).allow(''),
  minor: Joi.string().alphanum().max(BASE_STRING_MAX_LENGTH).allow(''),
  bio: Joi.string().alphanum().max(BASE_STRING_MAX_LENGTH).allow(''),
  timezone: Joi.array()
    .items(Joi.string().valid(...TIMEZONES.map((tz) => tz && tz.value)))
    .allow(''),
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
  currentlyPlaying: Joi.array().items(gameSchema).max(5).allow(),
  favoriteGames: Joi.array().items(gameSchema).max(5).allow(),
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
export const signUpSchema = Joi.object({
  firstName: Joi.string().alphanum().max(BASE_STRING_MAX_LENGTH).required(),
  lastName: Joi.string().alphanum().max(BASE_STRING_MAX_LENGTH).required(),
  email: emailSchema.required(),
  password: passwordSchema.required(),
  school: Joi.string().alphanum().max(BASE_STRING_MAX_LENGTH).required(),
  status: userStatusSchema.required(),
});
export const logInSchema = Joi.object({
  email: emailSchema.required(),
  password: passwordSchema.required(),
});
export const forgotPasswordSchema = Joi.object({
  email: emailSchema.required(),
});
export const passwordResetSchema = Joi.object({
  password: passwordSchema.required(),
});
export const validateCreateUser = (form: {}) => userSchema.validate(form, validateOptions);
export const validateEditUser = (form: {}) => userSchema.validate(form, validateOptions);
export const validateCreateEvent = (form: {}) => eventSchema.validate(form, validateOptions);
export const validateEditEvent = (form: {}) => eventSchema.validate(form, validateOptions);
export const validateEditSchool = (form: {}) => schoolSchema.validate(form, validateOptions);
export const validateCreateTeam = (form: {}) => eventSchema.validate(form, validateOptions);
export const validateEditTeam = (form: {}) => eventSchema.validate(form, validateOptions);
export const validateSignUp = (form: {}) => signUpSchema.validate(form, validateOptions);
export const validateLogIn = (form: {}) => logInSchema.validate(form, validateOptions);
export const validateForgotPassword = (form: {}) => forgotPasswordSchema.validate(form, validateOptions);
export const validatePasswordReset = (form: {}) => passwordResetSchema.validate(form, validateOptions);

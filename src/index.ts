// @ts-ignore
import range from 'lodash.range';
// @ts-ignore
import capitalize from 'lodash.capitalize';
// @ts-ignore
import md5 from 'md5';
// @ts-ignore
// import startCase from "lodash.startcase";

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

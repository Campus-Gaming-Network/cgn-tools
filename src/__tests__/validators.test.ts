import { ValidationResult } from 'joi';
import {
  validateLogIn,
  validateForgotPassword,
  validatePasswordReset,
  STUDENT_STATUS_OPTIONS,
  SUPPORT_EMAIL,
  MIN_PASSWORD_LENGTH,
  validateSignUp,
} from '../index';

const STATUSES: { [key: string]: string } = STUDENT_STATUS_OPTIONS.reduce(
  (acc, curr) => ({
    ...acc,
    ...(Boolean(curr.value) ? { [curr.value]: curr.value } : {}),
  }),
  {},
);

const AUTH_USER = {
  email: SUPPORT_EMAIL,
  password: 'password',
};

const USER = {
  firstName: 'Campus',
  lastName: 'Gamer',
  school: 'CGN',
  status: STATUSES.FRESHMAN,
};

const SIGN_UP_FORM = 'SIGN_UP';
const LOG_IN_FORM = 'LOG_IN';
const FORGOT_PASSWORD_FORM = 'FORGOT_PASSWORD';
const PASSWORD_RESET_FORM = 'PASSWORD_RESET';

const FORMS = {
  [SIGN_UP_FORM]: {
    ...USER,
    ...AUTH_USER,
  },
  [LOG_IN_FORM]: AUTH_USER,
  [FORGOT_PASSWORD_FORM]: {
    email: AUTH_USER.email,
  },
  [PASSWORD_RESET_FORM]: {
    password: AUTH_USER.password,
  },
};

const NULL = null;
const UNDEFINED = undefined;
const EMPTY_STRING = '';
const EMPTY_STRING_SPACE = ' ';
const SHORT_PASSWORD = AUTH_USER.password.substring(0, MIN_PASSWORD_LENGTH - 1);
const INVALID_EMAIL = SUPPORT_EMAIL.replace('@', '');

const toBeValid = (result: ValidationResult): void => expect(result.error).toBeUndefined();
const toBeInvalid = (result: ValidationResult): void => expect(result.error).not.toBeUndefined();

////////////////////////////////////////////////////////////////////////////////
// Sign Up Form

describe(SIGN_UP_FORM, () => {
  it('should be a valid sign up - FRESHMAN', () => {
    toBeValid(validateSignUp(FORMS.SIGN_UP));
  });
});

////////////////////////////////////////////////////////////////////////////////
// Log In Form

describe(LOG_IN_FORM, () => {
  it('should be a valid login', () => {
    toBeValid(validateLogIn(FORMS.LOG_IN));
  });

  it('should be an invalid log in - email - empty string', () => {
    toBeInvalid(validateLogIn({ ...FORMS.LOG_IN, email: EMPTY_STRING }));
  });

  it('should be an invalid log in - email - null', () => {
    toBeInvalid(validateLogIn({ ...FORMS.LOG_IN, email: NULL }));
  });

  it('should be an invalid log in - email - undefined', () => {
    toBeInvalid(validateLogIn({ ...FORMS.LOG_IN, email: UNDEFINED }));
  });

  it('should be an invalid log in - email - empty string space', () => {
    toBeInvalid(validateLogIn({ ...FORMS.LOG_IN, email: EMPTY_STRING_SPACE }));
  });

  it('should be an invalid log in - email - not valid', () => {
    toBeInvalid(validateLogIn({ ...FORMS.LOG_IN, email: INVALID_EMAIL }));
  });

  it('should be an invalid log in - password - empty string', () => {
    toBeInvalid(validateLogIn({ ...FORMS.LOG_IN, password: EMPTY_STRING }));
  });

  it('should be an invalid log in - password - null', () => {
    toBeInvalid(validateLogIn({ ...FORMS.LOG_IN, password: NULL }));
  });

  it('should be an invalid log in - password - undefined', () => {
    toBeInvalid(validateLogIn({ ...FORMS.LOG_IN, password: UNDEFINED }));
  });

  it('should be an invalid log in - password - empty string space', () => {
    toBeInvalid(validateLogIn({ ...FORMS.LOG_IN, password: EMPTY_STRING_SPACE }));
  });
});

////////////////////////////////////////////////////////////////////////////////
// Forgot Password Form

describe(FORGOT_PASSWORD_FORM, () => {
  it('should be a valid forgot password', () => {
    toBeValid(validateForgotPassword(FORMS.FORGOT_PASSWORD));
  });

  it('should be an invalid forgot password - email - empty string', () => {
    toBeInvalid(validateForgotPassword({ ...FORMS.LOG_IN, email: EMPTY_STRING }));
  });

  it('should be an invalid forgot password - email - null', () => {
    toBeInvalid(validateForgotPassword({ ...FORMS.LOG_IN, email: NULL }));
  });

  it('should be an invalid forgot password - email - undefined', () => {
    toBeInvalid(validateForgotPassword({ ...FORMS.LOG_IN, email: UNDEFINED }));
  });

  it('should be an invalid forgot password - email - empty string space', () => {
    toBeInvalid(validateForgotPassword({ ...FORMS.LOG_IN, email: EMPTY_STRING_SPACE }));
  });

  it('should be an invalid forgot password - email - not valid', () => {
    toBeInvalid(validateForgotPassword({ ...FORMS.LOG_IN, email: INVALID_EMAIL }));
  });
});

////////////////////////////////////////////////////////////////////////////////
// Password Reset Form

describe(PASSWORD_RESET_FORM, () => {
  it('should be a valid password reset', () => {
    toBeValid(validatePasswordReset(FORMS.PASSWORD_RESET));
  });

  it('should be an invalid password reset - password - empty string', () => {
    toBeInvalid(validatePasswordReset({ ...FORMS.PASSWORD_RESET, password: EMPTY_STRING }));
  });

  it('should be an invalid password reset - password - null', () => {
    toBeInvalid(validatePasswordReset({ ...FORMS.PASSWORD_RESET, password: NULL }));
  });

  it('should be an invalid password reset - password - undefined', () => {
    toBeInvalid(validatePasswordReset({ ...FORMS.PASSWORD_RESET, password: UNDEFINED }));
  });

  it('should be an invalid password reset - password - empty string space', () => {
    toBeInvalid(validatePasswordReset({ ...FORMS.PASSWORD_RESET, password: EMPTY_STRING_SPACE }));
  });

  it('should be an invalid password reset - password - too short', () => {
    toBeInvalid(validatePasswordReset({ ...FORMS.PASSWORD_RESET, password: SHORT_PASSWORD }));
  });
});

////////////////////////////////////////////////////////////////////////////////
// Sentry Constants

// Libraries
const { Integrations } = require("@sentry/tracing");

// Utilities
const { isProdSentry } = require("../utilities/sentry");

const SENTRY_CONFIG = {
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
  environment: isProdSentry() ? "production" : "development",
};

module.exports = {
  SENTRY_CONFIG,
};

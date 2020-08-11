import Raven from "raven-js";

function init() {
  Raven.config(
    "https://aa55084a51744acba27b1ba75a235aa0@o431757.ingest.sentry.io/5383721"
  ).install();
}

function log(message) {
  Raven.captureException(message);
}

export default {
  init,
  log,
};

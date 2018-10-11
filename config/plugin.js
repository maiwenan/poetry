'use strict';

// had enabled by egg
// exports.static = true;

// oauth
exports.passport = {
  enabled: true,
  package: 'egg-passport',
};
exports.passportLocal = {
  enabled: true,
  package: 'egg-passport-local',
};

// mongodb database
exports.mongoose = {
  enabled: true,
  package: 'egg-mongoose',
};

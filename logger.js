const createDebug = require("debug");

const getLogger = (namespace) => {
  const log = createDebug(`${namespace}:log`);
  const error = createDebug(`${namespace}:err`);
  const warn = createDebug(`${namespace}:warn`);

  log.color = 2;
  error.color = 1;
  warn.color = 3;

  return { log, error, warn };
};
module.exports = getLogger;

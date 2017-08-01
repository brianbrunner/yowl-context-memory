var sessions = {};

module.exports = function (context, event, next) {
  // create unique id for the current platform/session combo
  var id = context.platform.name + "|" + context.sessionId;
  var savedSession = (id in sessions) ? sessions[id] : {};
  context.mergeSession(savedSession);
  next(null, function(context, event, next) {
    sessions[id] = context.dumpSession();
    next();
  });
};

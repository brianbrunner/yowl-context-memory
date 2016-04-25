var _ = require('lodash');
var contexts = {};

module.exports = function (context, event, next) {
  // create unique id for the current platform/session combo
  var id = context._platform.name + "|" + context.sessionId;
  var savedContext = (id in contexts) ? contexts[id] : {};
  context.merge(savedContext);
  next(null, function(context, event, next) {
    contexts[id] = context.dump();
    next();
  });
};

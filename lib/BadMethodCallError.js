var util = require('util');
var parent = JSymfony.Error;

function BadMethodCallError(msg, code, previous) {
    parent.call(this, msg, code, previous)
}

util.inherits(BadMethodCallError, parent);

BadMethodCallError.prototype.message = 'Bad Method call error';
BadMethodCallError.prototype.name = 'BadMethodCallError';

JSymfony.BadMethodCallError = module.exports = BadMethodCallError;

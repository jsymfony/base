var util = require('util');
var parent = JSymfony.Error;

function LogicError(msg, code, previous) {
    parent.call(this, msg, code, previous)
}

util.inherits(LogicError, parent);

LogicError.prototype.message = 'Logic error';
LogicError.prototype.name = 'LogicError';

JSymfony.LogicError = module.exports = LogicError;

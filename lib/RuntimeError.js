var util = require('util');
var parent = JSymfony.Error;

function RuntimeError(msg, code, previous) {
    parent.call(this, msg, code, previous)
}

util.inherits(RuntimeError, parent);

RuntimeError.prototype.message = 'Runtime error';
RuntimeError.prototype.name = 'RuntimeError';

JSymfony.RuntimeError = module.exports = RuntimeError;

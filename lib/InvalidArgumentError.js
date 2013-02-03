var util = require('util');

var parent = JSymfony.Error;

function InvalidArgumentError(msg) {
    parent.call(this, msg)
}

util.inherits(InvalidArgumentError, parent);

InvalidArgumentError.prototype.message = 'Invalid argument error';
InvalidArgumentError.prototype.name = 'InvalidArgumentError';

JSymfony.InvalidArgumentError = module.exports = InvalidArgumentError;

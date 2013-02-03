var util = require('util');
var parent = JSymfony.OutOfBoundsError;

function OutOfBoundsError(message) {
    parent.call(this, message)
}

util.inherits(OutOfBoundsError, parent);

OutOfBoundsError.prototype.message = 'Out of bounds';
OutOfBoundsError.prototype.name = 'OutOfBoundsError';

JSymfony.DependencyInjection.Error.OutOfBoundsError = module.exports = OutOfBoundsError;

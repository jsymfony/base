var util = require('util');
var parent = JSymfony.Error;

function NotImplementedError(object, method) {
    var msg = 'Not implemented';
    if (object && method) {
        msg = 'Class "' + object.constructor.name + '" should implement method "' + method + '"';
    }
    parent.call(this, msg);
}

util.inherits(NotImplementedError, parent);

NotImplementedError.prototype.name = 'NotImplementedError';

JSymfony.NotImplementedError = module.exports = NotImplementedError;

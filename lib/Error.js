var util = require('util');

function AbstractError(msg, code, previous) {
    this.rawStack = this.prepareRawStack(this.constructor);

    Error.captureStackTrace(this, this.constructor);

    this.message = msg || 'Error';
    this.code = code;
    this.previous = previous;
}

util.inherits(AbstractError, Error);

AbstractError.prototype.prepareRawStack = function () {
    var e = new Error();
    Error.captureStackTrace(e, this.constructor);

    var orig = Error.prepareStackTrace;
    Error.prepareStackTrace = function(_, stack){
        return stack;
    };
    var stack = e.stack;
    Error.prepareStackTrace = orig;
    return stack;
};

AbstractError.prototype.name = 'Error';
AbstractError.prototype.public = false;


JSymfony.Error = module.exports = AbstractError;

var _ = require('lodash');
var fn = JSymfony.fn;
var FunctionReflect = JSymfony.Reflect.FunctionReflect;

function FunctionRunner() {

}

FunctionRunner.prototype.run = function (func, context, args, errorHandler) {
    if (!_.isArray(args) && !_.isPlainObject(args)) {
        args = fn.castArray(args);
    }

    if (typeof func !== 'function') {
        if (errorHandler) {
            errorHandler.call(this);
        } else {
            throw new Error('FunctionRunner can run only functions');
        }
    }

    if (_.isArray(args)) {
        return func.apply(context, args);
    }

    var reflect = new FunctionReflect(func);
    var functionArgs = reflect.getArguments();

    var callArgs = [];
    var notFoundArgs = [];
    for (var i = 0; i < functionArgs.length; i++) {
        if (!args.hasOwnProperty(functionArgs[i])) {
            notFoundArgs.push(functionArgs[i]);
        }
        callArgs.push(args[functionArgs[i]]);
    }

    if (notFoundArgs.length > 0) {
        if (errorHandler) {
            return errorHandler.call(this, notFoundArgs);
        } else {
            throw new JSymfony.RuntimeError('Arguments "' + notFoundArgs.join('", "') + '" must be passed to execute function');
        }
    }

    return func.apply(context, callArgs);
};

JSymfony.FunctionRunner = module.exports = FunctionRunner;

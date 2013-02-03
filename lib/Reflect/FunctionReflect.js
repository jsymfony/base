var fn = JSymfony.fn;

function FunctionReflect(func) {
    this._function = func;
    this._parsed = this.parse(func);
}

FunctionReflect.prototype.FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;

FunctionReflect.prototype.parse = function (func) {
    var str = func.toString();

    var args = [];
    var match = str.match(this.FN_ARGS);
    match = fn.trim(match[1]);
    if (match) {
        match.split(',').forEach(function (argument) {
            args.push(fn.trim(argument));
        });
    }

    return {
        arguments: args
    }
};

FunctionReflect.prototype.getArguments = function () {
    return this._parsed.arguments;
};

JSymfony.Reflect.FunctionReflect = module.exports = FunctionReflect;

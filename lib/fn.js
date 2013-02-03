var _ = require('lodash');
var sprintf = require('sprintf');
var util = require('util');
var crypto = require('crypto');

var fn = exports;

fn.md5 = function (string, encoding) {
    return fn.hash('md5', string, encoding);
};

fn.hash = function(algorithm, string, encoding) {
    encoding = encoding || 'hex';
    return crypto.createHash(algorithm).update(string).digest(encoding);
};

fn.uniqueId = function(prefix, length, mask) {
    var result = prefix || '';
    length = length || 8;
    mask = mask || 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        result += mask[Math.floor(Math.random() * mask.length)];
    }
    return result;
};

fn.regexpQuote = function (str) {
    return str.replace(/([\/\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g, "\\$1");
};

fn.trim = function (str, chars) {
    str = str || '';
    chars = chars  ? fn.regexpQuote(chars) : ' \\s\xA0';

    var r = new RegExp('^[' + chars + ']+|[' + chars + ']+$');
    return str.replace(r, '');
};

fn.ltrim = function (str, chars) {
    str = str || '';
    chars = chars  ? fn.regexpQuote(chars) : ' \\s\xA0';
    var r = new RegExp('^[' + chars + ']+');
    return str.replace(r, '');
};

fn.rtrim = function (str, chars) {
    str = str || '';
    chars = chars  ? fn.regexpQuote(chars) : ' \\s\xA0';

    var r = new RegExp('[' + chars + ']+$');
    return str.replace(r, '');
};

fn.isAbsolutePath = function (path) {
    return '/' == path[0] || ':' == path[1] && '\\' == path[2];
};


fn.strtr = function (str, from, to) {
    if (typeof from === 'object') {
        var cmpStr = '';
        for (var j=0; j < str.length; j++){
            cmpStr += '0';
        }

        var addStr = '';
        for (var fr in from) {
            if (!from.hasOwnProperty(fr)) {
                continue;
            }
            var offset = 0;
            var find;
            while ((find = str.indexOf(fr, offset)) != -1) {
                if (parseInt(cmpStr.substr(find, fr.length)) != 0) {
                    offset = find + 1;
                    continue;
                }
                for (var k =0 ; k < from[fr].length; k++){
                    addStr += '1';
                }
                cmpStr = cmpStr.substr(0, find) + addStr + cmpStr.substr(find + fr.length, cmpStr.length - (find + fr.length));
                str = str.substr(0, find) + from[fr] + str.substr(find + fr.length, str.length - (find + fr.length));
                offset = find + from[fr].length + 1;
                addStr = '';
            }
        }
        return str;
    }

    for(var i = 0; i < from.length; i++) {
        str = str.replace(new RegExp(from.charAt(i),'g'), to.charAt(i));
    }

    return str;
};

fn.getDepthKey = function (key, object, defaultValue) {
    object = object || global;

    var node = object;
    var parts = key.split('.');

    for (var i = 0; i < parts.length; i++) {
        node = node[parts[i]];
        if (!node) {
            if (typeof defaultValue !== 'undefined') {
                return defaultValue;
            } else {
                throw new Error('Key "' + key + '" not found')
            }
        }
    }
    return node;
};

fn.construct = function(constructor, args) {
    if (typeof constructor !== 'function') {
        throw new Error('Constructor "' + constructor + '" should be function');
    }

    function F() {
        return constructor.apply(this, args);
    }
    F.prototype = constructor.prototype;
    return new F();
};

fn.toCamelCase = function (string) {
    return string.replace(/(^|_|\.)+(.)/g, function (str, a, b) {
        return ('.' === a ? '_' : '') + b.toUpperCase();
    });
};

fn.camelCaseToUnderscore = function (string) {
    return string.replace('_', '.').replace(/([A-Z]+)([A-Z][a-z])/g, function (str, a, b) {
        return a + '_' + b;
    }).replace(/([a-z\d])([A-Z])/g, function (str, a, b) {
       return a + '_' + b;
    }).toLowerCase();
};

fn.instanceof = function (object, interfaceOrClass) {
    if (typeof interfaceOrClass !== 'function') {
        throw new Error('Provide interface or class');
    }
    if (typeof object !== 'object') {
        return false;
    }
    var proto = interfaceOrClass.prototype;
    for (var i in proto) {
        if (!proto.hasOwnProperty(i)) {
            continue;
        }
        if (!(i in object)) {
            return false;
        }
        if (typeof proto[i] === 'function' && typeof[object[i]] !== 'function') {
            return false;
        }
    }
    return true;
};

fn.castArray = function (arg) {
    if (typeof arg === 'undefined') {
        return [];
    }

    if (util.isArray(arg)) {
        return arg;
    }

    return [arg];
};

fn.call = function (callable) {
    if (typeof callable === 'undefined') {
        return;
    }
    var args = Array.prototype.slice.call(arguments, 1);

    if (typeof callable === 'function') {
        return callable.apply(null, args);
    }

    if (_.isArray(callable) && callable.length >= 2 && typeof callable[0] === 'object') {
        var obj = callable[0];
        var method = callable[1];
        if (obj.hasOwnProperty(method) && typeof obj[method] === 'function') {
            return obj[method].apply(obj, args);
        }
    }

    throw new Error('Invalid callable');
};

fn.merge = _.merge;
fn.extend = _.extend;
fn.clone = _.clone;
fn.sprintf = sprintf.sprintf;
fn.vsprintf = sprintf.vsprintf;

fn.proxy = function (proxyCallback, successCallback) {
    return function(err, data) {
        var args = Array.prototype.slice.call(arguments);
        if (err) {
            return fn.call.apply(null, [proxyCallback].concat(args));
        } else {
            return fn.call.apply(null, [successCallback].concat(args.slice(1)));
        }
    }
};

fn.isScalar = function (value) {
    return (/boolean|number|string/).test(typeof value);
};

fn.isFloat = function (n) {
  return n===+n && n!==(n|0);
};

fn.isInteger = function (n) {
  return n===+n && n===(n|0);
};

fn.escapeHtmlChars = function(html){
  return String(html)
    .replace(/&(?!\w+;)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
};

JSymfony.fn = module.exports = fn;

var _ = require('lodash');

function Map(data) {
    if (!(this instanceof Map)) {
        return new Map(data);
    }
    this._values = {};
    this._keys = [];

    this.setData(data);
}

Map.prototype.get = function (key) {
    return this.has(key) ? this._values[this._escapeKey(key)] : undefined;
};

Map.prototype.has = function (key) {
    return this._values.hasOwnProperty(this._escapeKey(key));
};

Map.prototype.set = function (key, value) {
    if (!this.has(key)) {
        this._keys.push(key);
    }

    this._values[this._escapeKey(key)] = value;
    return this;
};

Map.prototype.setData = function (data) {
    this.clear();

    if (typeof data === 'undefined') {
        return this;
    }

    if (data instanceof Map) {
        this._values = fn.extend(this._values, data._values);
        this._keys = data._keys.slice()
    } else if (_.isPlainObject(data)) {
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                this.set(key, data[key]);
            }
        }
    } else if (_.isArray(data)) {
        for (var i = 0; i < data.length; i++) {
            this.set(i, data[i]);
        }
    }

    return this;
};

Map.prototype.delete = function (key) {
    if (this.has(key)) {
        delete this._values[this._escapeKey(key)];
        var pos = this._keys.indexOf(key);
        if (pos !== -1) {
            this._keys.splice(this._keys.indexOf(key), 1);
        }
    }
    return this;
};

Map.prototype.keys = function () {
    return this._keys;
};

Map.prototype.size = function () {
    return this._keys.length;
};

Map.prototype.forEach = function (callback) {
    var keys = this._keys;
    for (var i = 0; i < keys.length; i++) {
        var res = callback(keys[i], this._values[this._escapeKey(keys[i])]);
        if (res === false) {
            break;
        }
    }
};

Map.prototype.clear = function () {
    this._values = {};
    this._keys = [];
};

Map.prototype._escapeKey = function (key) {
    return '$' + key;
};

JSymfony.Map = module.exports = Map;

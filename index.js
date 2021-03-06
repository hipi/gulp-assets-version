"use strict";

var crypto = require('crypto');

var PluginError = require("plugin-error");
var through = require('through2');

var PLUGIN_NAME = 'gulp-assets-version';

var ASSET_REG = {
    "SCRIPT": /(<script[^>]+src=)['"]([^'"]+)["']/ig,
    "STYLESHEET": /(<link[^>]+href=)['"]([^'"]+)["']/ig,
    "IMAGE": /(<img[^>]+src=)['"]([^'"]+)["']/ig,
    "BACKGROUND": /(url\()(?!data:|about:)([^)]*)/ig
};

var createHash = function (file, len) {
    return crypto.randomBytes(5).toString('hex')
};
module.exports = function (options) {
    var VERSION = createHash()
    return through.obj(function (file, enc, cb) {
        options = options || {};
        if (file.isNull()) {
            this.push(file);
            return cb();
        }
        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return cb();
        }
        var content = file.contents.toString();
        for (var type in ASSET_REG) {
            content = content.replace(ASSET_REG[type], function (str, tag, src) {
                src = src.replace(/(^['"]|['"]$)/g, '');               
                if (!/\.[^\.]+$/.test(src)) {
                    return str;
                }

                // remote resource
                if (/^https?:\/\//.test(src)) {
                    return str;
                }

                // exclude resource
                if (options.exclude && options.exclude.test(src)) {
                    return str;
                }

                var version = options.version || VERSION;
                var preStr = options.preStr || 'v';
                src = src + "?" + preStr + "=" + version
                return tag + '"' + src + '"';
            });
        }
        file.contents = new Buffer(content);
        this.push(file);
        cb();
    });
};


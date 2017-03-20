"use strict";
var aesjs = require('aes-js');
var pbkdf2 = require('pbkdf2');
var disguise = (function () {
    function disguise(key, salt) {
        this.key = pbkdf2.pbkdf2Sync(key, salt, 1, 256 / 8, 'sha512');
        this.iv = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
        return this;
    }
    disguise.prototype.encode = function (message) {
        message = this.pad(message, 16, '~');
        var textBytes = aesjs.utils.utf8.toBytes(message);
        var aesCbc = new aesjs.ModeOfOperation.cbc(this.key, this.iv);
        var encryptedBytes = aesCbc.encrypt(textBytes);
        var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
        return encryptedHex;
    };
    disguise.prototype.decode = function (message) {
        var encryptedBytes = aesjs.utils.hex.toBytes(message);
        var aesCbc = new aesjs.ModeOfOperation.cbc(this.key, this.iv);
        var decryptedBytes = aesCbc.decrypt(encryptedBytes);
        var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
        return decryptedText.replace(/~/g, '');
    };
    disguise.e = function (key, salt, message) {
        var h = new disguise(key, salt);
        return h.encode(message);
    };
    disguise.prototype.pad = function (message, l, c) {
        var m = l;
        if (message.length > m) {
            m = ((message.length % m) + 1) * m;
        }
        return message + Array(m - message.length + 1).join(c || " ");
    };
    return disguise;
}());
module.exports = disguise;

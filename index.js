"use strict";
var aesjs = require('aes-js');
var pbkdf2 = require('pbkdf2');
var disguise = (function () {
    function disguise(key, salt, iv) {
        if (iv === void 0) { iv = ""; }
        this.key = pbkdf2.pbkdf2Sync(key, salt, 1, 256 / 8, 'sha512');
        if (iv.length == 16) {
            this.iv = iv;
        }
        else {
            this.iv = [
                24, 79, 78, 76,
                15, 86, 57, 64,
                14, 3, 43, 33,
                25, 51, 56, 24,
            ];
        }
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

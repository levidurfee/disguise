declare function require(name:string);
var aesjs = require('aes-js');
var pbkdf2 = require('pbkdf2');

class disguise {
    private key;
    private iv;

    constructor(key, salt) {
        this.key = pbkdf2.pbkdf2Sync(key, salt, 1, 256 / 8, 'sha512');
        this.iv = [ 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,35, 36 ];
        return this;
    }

    encode(message) {
       message = this.pad(message, 16, '~');
       var textBytes = aesjs.utils.utf8.toBytes(message);
       var aesCbc = new aesjs.ModeOfOperation.cbc(this.key, this.iv);
       var encryptedBytes = aesCbc.encrypt(textBytes);
       var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
       return encryptedHex;
    }

    decode(message) {
        //
    }

    static e(key, salt, message) {
        var h = new disguise(key, salt);
        return h.encode(message);
    }

    pad(message, l, c) {
        var m = l;
        if(message.length > m) {
            m = ((message.length % m) + 1) * m;
        }
        return message+Array(m-message.length+1).join(c||" ");
    }
}

export = disguise;

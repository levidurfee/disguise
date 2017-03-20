var assert = require('assert');
var dsg = require('../index.js');

var d = new dsg('levi', 'salt');
var decrypted = d.decode('e4c3a5432de89e20c3914d748d20c686');

describe('Disguise', function() {
    describe('e()', function() {
        it('should return an encrypted string', function() {
            assert.equal('e4c3a5432de89e20c3914d748d20c686',
                dsg.e('levi', 'salt', 'message')
            );
        });
    });
    describe('decode()', function() {
        it('should return a decrypted string', function() {
            assert.equal('message',
                decrypted
            );
        });
    });
});
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});

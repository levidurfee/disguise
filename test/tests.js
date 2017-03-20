var assert = require('assert');
var dsg = require('../index.js');

var d = new dsg('levi', 'salt');
var hex = 'fc3c1c70e142b65abf66a790b87d9945';
var decrypted = d.decode(hex);

describe('Disguise', function() {
    describe('e()', function() {
        it('should return an encrypted string', function() {
            assert.equal(hex,
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

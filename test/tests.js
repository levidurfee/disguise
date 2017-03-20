var assert = require('assert');
var dsg = require('../index.js');

describe('Disguise', function() {
    describe('encode()', function() {
        it('should return an encrypted string', function() {
            assert.equal('e4c3a5432de89e20c3914d748d20c686', 
                dsg.e('levi', 'salt', 'message')
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

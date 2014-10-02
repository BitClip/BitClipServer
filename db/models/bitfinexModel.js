var db = require('../dbSchema.js');

var BitfinexData = db.Model.extend({
  tableName: 'bitfinexMarketData',
  hasTimestamps: false
});

module.exports = BitfinexData;

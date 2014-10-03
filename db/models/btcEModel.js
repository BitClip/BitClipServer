var db = require('../dbSchema.js');

var BtcEData = db.Model.extend({
  tableName: 'btcEMarketData',
  hasTimestamps: false
});

module.exports = BtcEData;

var path = require('path');
var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, './data/db.sqlite')
  }
});

var db = require('bookshelf')(knex);

/************************************************************/
// Market data aggregation tables
/************************************************************/

db.knex.schema.hasTable('aggregatedMarketData').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('aggregatedMarketData', function(marketData) {
      marketData.increments('aggregatedMarketDataKey').primary();
      marketData.integer('sourceKey').unsigned().references('sourceKey').inTable('sources');
      marketData.float('amount');
      marketData.decimal('price', 18, 2);
      marketData.integer('createdAt');
    }).then(function(table) {
      console.log('Created aggregatedMarketData', table);
    });
  }
});

db.knex.schema.hasTable('bitstampMarketData').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('bitstampMarketData', function(marketData) {
      marketData.increments('bitstampTradeKey').primary();
      marketData.float('amount');
      marketData.decimal('price', 18, 2);
      marketData.integer('createdAt');
    }).then(function(table) {
      console.log('Created bitstampMarketData', table);
    });
  }
});

/************************************************************/
// Utility and joining tables
/************************************************************/

db.knex.schema.hasTable('sources').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('sources', function(source) {
      source.increments('sourceKey').primary();
      source.string('source', 100).unique();
    }).then(function(table) {
      console.log('Created sources', table);
    });
  }
});

module.exports = db;

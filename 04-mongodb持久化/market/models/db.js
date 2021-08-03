const { MongoClient } = require('mongodb');
const { EventEmitter } = require('events');
const config = require('./config');

class MongoDB {
  constructor(config) {
    this.config = config;
    this.event = new EventEmitter();
    this.client = new MongoClient(config.url, {
      useNewUrlParser: true
    });
      console.log(11111);
      this.client.connect(err => {
          if (err) throw err;
          this.event.emit('connect');
      });
  }

  col(colName, dbName = config.dbName) {
    return this.client.db(dbName).collection(colName);
  }

  once(name, cb) {
    this.event.once(name, cb);
  }
}

module.exports = function mongodb() {
    return new MongoDB(config);
};
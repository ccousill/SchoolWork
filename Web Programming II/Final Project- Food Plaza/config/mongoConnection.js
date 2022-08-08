const MongoClient = require('mongodb').MongoClient;
const settings = {
  "mongoConfig": {
    "serverUrl": "mongodb+srv://cs554:cHS8Xstn6jJuKH8@cs554.kl0iw.mongodb.net/test",
    "database": "CS554Final"
  }
};
const mongoConfig = settings.mongoConfig;
let _connection = undefined;
let _db = undefined;

module.exports = async () => {
  if (!_connection) {
    _connection = await MongoClient.connect(mongoConfig.serverUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    _db = await _connection.db(mongoConfig.database);
  }

  return _db;
};

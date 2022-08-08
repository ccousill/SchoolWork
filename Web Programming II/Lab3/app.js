const bluebird = require('bluebird');
const express = require('express');
const app = express();
const redis = require('redis');
const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const configRoutes = require('./routes');
const exphbs = require('express-handlebars');
const static = express.static(__dirname + '/public');


app.use(express.json());
app.use('/public', static);
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});
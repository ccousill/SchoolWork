const myKitchen = require('./myKitchen');
const recipe = require('./recipe');
const users = require('./users');
const images = require('./images');

const constructorMethod = (app) => {
  app.use('/myKitchen', myKitchen)
  app.use('/recipe', recipe)
  app.use('/users', users)
  app.use('/images', images)
  app.use('*', (req, res) => {
    res.status(404).send();
  });

};

module.exports = constructorMethod;
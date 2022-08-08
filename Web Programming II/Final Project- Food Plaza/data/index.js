const myKitchenData = require('./myKitchen');
const recipeData = require('./recipe');
const userData = require('./users');
const imageData = require('./images');

module.exports = {
	myKitchen: myKitchenData,
	recipe : recipeData,
	users : userData,
	images : imageData
}
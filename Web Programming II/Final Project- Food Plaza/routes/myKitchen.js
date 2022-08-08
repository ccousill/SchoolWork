const express = require('express');
const router = express.Router();
const data = require('../data');
const xss = require('xss');
const kitchenData = data.myKitchen;
const jwtDecode = require('jwt-decode');

function validToken(token) {
	try {
		let decoded = jwtDecode(token);
		if (decoded.iss === 'https://securetoken.google.com/cs-554-final-project-f5747') {
			return true;
		}
	} catch (e) {
		return false;
	}
	return false;
}

router.post('/addItem/:id', async (req, res) => {
	if (!validToken(xss(req.body.token))) {
		res.status(403).send();
		return;
	}
	try {
		let id = xss(req.params.id);
		let newItem = {};
		for (const [key, value] of Object.entries(req.body.newItem)) {
			newItem[key] = xss(value);
		}
		if((typeof(id) !== 'string') || (id.trim().length === 0)) throw 'must supply id';
		if(!newItem) throw "please supply a body";
		let myKitchen = await kitchenData.addItem(id, newItem);
		res.json(myKitchen)
	} catch (e) {
		res.status(404).json({ error: e.toString() });
	}
});


router.delete('/removeItem/:id', async (req, res) => {
	if (!validToken(xss(req.body.token))) {
		res.status(403).send();
		return;
	}
	try {
		let recipeId = xss(req.params.id);
		let userId = xss(req.body.id);
		if((typeof(recipeId) !== 'string') || (recipeId.trim().length === 0)) throw 'must supply id';
		if(!userId) throw "please supply a body";
		let myKitchen = await kitchenData.deleteItem(recipeId, userId)
		res.json(myKitchen)
	} catch (e) {
		res.status(404).json({ error: e.toString() });
	}

});

router.get('/:id', async (req, res) => {
	try {
		let id = xss(req.params.id);
		if((typeof(id) !== 'string') || (id.trim().length === 0)) throw 'must supply id';
		let myKitchen = await kitchenData.getKitchen(id);
		res.json(myKitchen)
	} catch (e) {
		res.status(404).json({ error: e.toString() });
	}
});

module.exports = router;

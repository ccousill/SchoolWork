const express = require('express');
const router = express.Router();
const data = require('../data');
const xss = require('xss');
const userData = data.users;
const jwtDecode = require('jwt-decode');

function validToken(token){
	try{
		let decoded = jwtDecode(token);
		if(decoded.iss === 'https://securetoken.google.com/cs-554-final-project-f5747'){
			return true;
		}
	} catch(e){
		return false;
	}
	return false;
}


router.post('/', async (req,res) =>{
	try{
		let uid = xss(req.body.uid);
		let displayName = xss(req.body.displayName);
		if((typeof(uid) !== 'string') || (uid.trim().length === 0)) throw 'must supply uid';
		if((typeof(displayName) !== 'string') || (displayName.trim().length === 0)) throw 'must supply displayName';
		let myUser = await userData.createUser(uid, displayName);
        res.json(myUser)
	}catch(e){
		res.status(404).json({error:e.toString()});
	}
});

router.post('/createUserWithSocial', async (req,res) =>{
	try{
		let uid = xss(req.body.uid);
		let displayName = xss(req.body.displayName);
		if((typeof(uid) !== 'string') || (uid.trim().length === 0)) throw 'must supply uid';
		if((typeof(displayName) !== 'string') || (displayName.trim().length === 0)) throw 'must supply displayName';
		let myUser = await userData.createUserWithSocial(uid, displayName);
		res.json(myUser)
	}catch(e){
		res.status(404).json({error:e.toString()});
	}
});

router.get('/getUserLikes/:id', async (req,res) =>{
	try{
		let id = xss(req.params.id);
		if((typeof(id) !== 'string') || (id.trim().length === 0)) throw 'must supply id';
		let userLikes = await userData.getUserLikes(id);
		res.json(userLikes)
	}catch(e){
		res.status(404).json({error:e.toString()});
	}
});

router.delete('/:id', async (req,res) =>{
	if(!validToken(xss(req.body.token))){
		res.status(403).send();
		return;
	}
	try{
		let id = xss(req.params.id);
		if((typeof(id) !== 'string') || (id.trim().length === 0)) throw 'must supply id';
		if(id !== jwtDecode(req.body.token).user_id) throw "cannot delete someone else's account"
		let deletedUser = await userData.deleteUser(id);
		res.json(deletedUser)
	}catch(e){
		console.log(e)
		res.status(404).json({error:e.toString()});
	}
});

router.post('/toggleLike/:id/:recipeId', async (req,res) =>{
	if(!validToken(xss(req.body.token))){
		res.status(403).send();
		return;
	}
	try{
		let id = xss(req.params.id);
		let recipeId = xss(req.params.recipeId);
		if((typeof(id) !== 'string') || (id.trim().length === 0)) throw 'must supply id';
		if(id !== jwtDecode(req.body.token).user_id) throw "cannot like as someone else"
		if((typeof(recipeId) !== 'string') || (recipeId.trim().length === 0)) throw 'must supply recipeId';
		let userLikes = await userData.toggleLikes(id,recipeId);
		res.json(userLikes)
	}catch(e){
		res.status(404).json({error:e.toString()});
	}
});
module.exports = router;

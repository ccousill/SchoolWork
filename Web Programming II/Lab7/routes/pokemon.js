const express = require('express');
const router = express.Router();
const axios = require('axios')
const redis = require('redis');
const client = redis.createClient();

//get pokemon from cache
router.get('/:id', async (req,res, next) =>{
	let cacheForPokemonExists = await client.hgetAsync('pokemon','pokemon'+req.params.id)
	let cachedPokemon = JSON.parse(cacheForPokemonExists)
	if(cacheForPokemonExists){
		console.log("cache")
		res.json(cachedPokemon)
	}else{
		next();
	}
});



//get pokemon
router.get('/:id', async (req,res) =>{

	try{
		console.log("not cache")
		const {data} = await axios.get("https://pokeapi.co/api/v2/pokemon/" + req.params.id)
		let cachedPokemon = await client.hsetAsync('pokemon','pokemon' + req.params.id, JSON.stringify(data) )
		res.json(data)
	}catch(e){
		res.status(404).json({error:e.toString()});
	}
});




//get pokemon list from cache
router.get('/page/:page', async (req,res, next) =>{
	let cacheForPokemonPageExists = await client.hgetAsync('pokemonPage','pokemonPage'+req.params.page)
	let cachedPokemonPage = JSON.parse(cacheForPokemonPageExists)
	if(cacheForPokemonPageExists){
		console.log("cache")
		res.json(cachedPokemonPage)
	}else{
		next();
	}
});


//get pokemon page
router.get('/page/:page', async (req,res) =>{
	let offset = (parseInt(req.params.page) * 20).toString()
	try{
		console.log('not cache')
		const {data} = await axios.get("https://pokeapi.co/api/v2/pokemon/?offset="+ offset+ "&limit=20")
		let cachedPokemonPage = await client.hsetAsync('pokemonPage','pokemonPage' + req.params.page, JSON.stringify(data) )
		res.json(data)
	}catch(e){
		res.status(404).json({error:e.toString()});
	}
});




module.exports = router;

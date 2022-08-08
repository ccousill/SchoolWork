const express = require('express');
const app = express.Router();
const axios = require('axios')
const redis = require('redis');
const client = redis.createClient();



//cache route for homepage, loads page from cache to load page faster
app.get('/', async(request, response, next) =>{
	let cacheForHomePageExists = await client.getAsync('homePage');
	if (cacheForHomePageExists) {
		response.send(cacheForHomePageExists);
	} else {
		next();
	}
});



//main route for getting homepage
app.get('/', async(request, response) =>{
	const {data} = await axios.get("http://api.tvmaze.com/shows");
	try{
		//callback funtion 
		response.render('shows/index', {"shows" : data}, async function(e,rendered){
			let cachedForHomePage = await client.setAsync('homePage', rendered);
			response.send(rendered);
		})	
	}catch (e){
		response.status(500).json({error:e});
	}
});

module.exports = app;
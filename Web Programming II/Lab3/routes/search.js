const axios = require('axios')
const express = require('express');
const app = express.Router();
const redis = require('redis');
const client = redis.createClient();

async function getShows(search){
	var link = 'http://api.tvmaze.com/search/shows?q='
	var searchShow = link.concat(search)
	const  {data} = await axios.get(searchShow)
  const parsedData = data;// parse the data from JSON into a normal JS Object
  return parsedData // this will be the array of people objects
}

app.post('/', async(request, response, next) =>{
	let cacheForSearchExists = await client.hgetAsync("searches", request.body.searchTerm);
	if (cacheForSearchExists) {
		//increments count of search term, since if search term was already used it will be loaded in cache
		let counts = await client.zincrbyAsync("counts", 1,request.body.searchTerm)
		response.send(cacheForSearchExists);
	} else {
		next();
	}
});


app.post('/', async(request, response) =>{
	try{
		if(request.body.searchTerm === null || request.body.searchTerm.match(/^ *$/) !== null) throw 'Must enter valid search';
		const ourShows = await getShows(request.body.searchTerm);
		searchedShows =[]
		for(i=0;i<20;i++){
			searchedShows.push(ourShows[i])
			if(ourShows[i] === undefined){
				searchedShows.pop()
			}
		}
		var myObj = {
			search:request.body.searchTerm,
			listShows:searchedShows
		}
	//callback function
	response.render('shows/search', {shows : myObj}, async function(e, rendered){
		let cachedForSearchPage = await client.hsetAsync("searches",request.body.searchTerm, rendered);
		//sets search count to 1 if nothing, counts is use to keep track of how many searches of the same term is used.
		let counts = await client.zaddAsync("counts",1, request.body.searchTerm)
		response.send(rendered);
	}) 
}catch(e){
	response.status(400).render('shows/error', {error:e});
}
});

module.exports = app;
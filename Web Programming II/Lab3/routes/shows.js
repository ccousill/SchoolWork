const axios = require('axios')
const express = require('express');
const app = express.Router();
const redis = require('redis');
const client = redis.createClient();

async function getShows(id){
	var link = 'http://api.tvmaze.com/shows/'
	var searchShow = link.concat(id)
	const  {data} = await axios.get(searchShow)
  const parsedData = data;// parse the data from JSON into a normal JS Object
  return parsedData // this will be the array of people objects
}



//route that checks for cache first
app.get('/:id', async(request, response, next) =>{
	let cacheForShowsExists = await client.hgetAsync('show', "show" + request.params.id);
	if (cacheForShowsExists) {
		response.send(cacheForShowsExists);
	} else {
		next();
	}
});


//main route for getting show by id
app.get('/:id', async(request, response) =>{
	try{

		numb = request.params.id;
		if(isNaN(numb) || numb < 0) throw 'Id must be a number';

		const showFound = await getShows(numb);
		if(showFound === undefined) throw 'error';
		response.render('shows/show', {show: showFound }, async function(e,rendered){
			let cachedShowsPage = await client.hsetAsync('show', 'show' + numb, rendered);
			response.send(rendered);
		}) 


	}catch(e){
		response.status(404).render('shows/error', {error: 'Could not find show'});
	}
}
);

module.exports = app;
const axios = require('axios')
const express = require('express');
const app = express.Router();

async function getShows(search){
  var link = 'http://api.tvmaze.com/search/shows?q='
  var searchShow = link.concat(search)
  const  {data} = await axios.get(searchShow)
  const parsedData = data;// parse the data from JSON into a normal JS Object
  return parsedData // this will be the array of people objects
}


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
	response.render('shows/search', {shows : myObj}) 
	}catch(e){
		response.status(400).render('shows/error', {error:e});
	}
});

module.exports = app;
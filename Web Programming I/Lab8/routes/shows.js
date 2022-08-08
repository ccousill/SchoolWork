const axios = require('axios')
const express = require('express');
const app = express.Router();

async function getShows(id){
  var link = 'http://api.tvmaze.com/shows/'
  var searchShow = link.concat(id)
  const  {data} = await axios.get(searchShow)
  const parsedData = data;// parse the data from JSON into a normal JS Object
  return parsedData // this will be the array of people objects
}


app.get('/:id', async(request, response) =>{
	try{

	    numb = parseInt(request.params.id);
	    if(isNaN(numb)) throw 'Id must be a number';

		const showFound = await getShows(numb);
		if(showFound === undefined) throw 'error';
		response.render('shows/show', {show: showFound }) 


	}catch(e){
		response.status(404).render('shows/error', {error: 'Could not find show'});
	}
}
);

module.exports = app;
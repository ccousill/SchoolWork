const axios = require('axios')
const express = require('express');
const app = express.Router();

async function getShows(){
  const  {data} = await axios.get('http://api.tvmaze.com/shows')
  const parsedData = data;// parse the data from JSON into a normal JS Object
  return parsedData // this will be the array of people objects
}


app.get('/', async (request,response) =>{
	try{
	const shows = await getShows();
	response.json(shows);
   }catch(e){
   	res.status(404).json({message : 'Post not found'});
   }


});

function getId(obj,id){

	for(x in obj){
		if(obj[x]['id'] == id){
			return obj[x];
		}
	}
	return undefined;
}


app.get('/:id', async(request, response) =>{
		try{

	    numb = parseInt(request.params.id);
	    if(isNaN(numb)) throw 'Id must be a number';
	   
	    
		const shows = await getShows();
		showById = getId(shows,request.params.id)
		if(typeof showById == 'undefined') throw 'error';
		response.json(showById);
		
	  }

		 
		catch(e){
			response.status(404).json({message:'id not found'});
		}

	
 });



module.exports = app;
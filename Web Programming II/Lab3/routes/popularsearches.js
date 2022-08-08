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

app.get('/', async(request, response) =>{
  try{
    let data = await client.zrevrangeAsync("counts", 0, 9);
    response.render('shows/popularsearches', {"shows" : data})
  }catch(e){
    response.status(400).render('shows/error', {error:e});
  }
});



module.exports = app;
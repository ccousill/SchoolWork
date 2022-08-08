// const axios = require('axios')
const express = require('express');
const app = express.Router();


app.get('/', async(request, response) =>{
	try{
	response.sendfile('main.html')
	}catch (e){
		response.status(500).json({error:e});
	}
 });

module.exports = app;





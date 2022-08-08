const express = require('express');
const app = express.Router();

app.get('/', async(request, response) =>{
	try{
	response.render('shows/index')
	}catch (e){
		response.status(500).json({error:e});
	}
 });

module.exports = app;
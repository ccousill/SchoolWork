const express = require('express');
const app = express.Router();




app.get('/', async(request, response) =>{
	try{
	aboutMe = {
		"name": "Christopher Cousillas",
		"cwid": "10435702",
		"biography": "I am 20 years old and attend Stevens Insitute of Technology for my Bachelor in Computer Science. Currently, I am in my 3rd year and wish I could come back to campus. I was born in Brooklyn NY and parents from Spain and Uruguay.\n My favorite foods are old fashion cheeseburgers and I love hanging out at the beach. My favorite past time is running outside on the track and playing board games with friends and family. I want to travel around the world with my top destination being Spain where the other half of my family lives. ",
		"favoriteShows": ["Breaking Bad", "Dexter", "Hannibal","South Park"]
	};
	if(!aboutMe) throw 'error';
	response.json(aboutMe);
	}catch(e){
			response.status(404).json({message:'Page failed to get data'});
		}
	

});

module.exports = app;
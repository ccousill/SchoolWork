//Christopher Cousillas
//10/18/2020
//CS 546WS 

const express = require('express')
const app = express();
const configRoutes = require('./routes');

app.use(express.json());

configRoutes(app);


app.listen(3000, () => {
	console.log('connecting to server')
	console.log('listening to http://localhost:3000')
});







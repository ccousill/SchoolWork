//Christopher Cousillas
//10/8/2020
//CS 546WS 

const express = require('express')
const app = express();
const configRoutes = require('./routes');


configRoutes(app);

app.listen(3000, () => {
	console.log('listening to http://localhost:3000')
});







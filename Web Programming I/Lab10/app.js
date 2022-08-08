const express = require('express');
const app = express();
const session = require('express-session');
const configRoutes = require('./routes');
const bcrypt = require('bcrypt');
app.use(express.json());


const exphbs = require('express-handlebars');
const static = express.static(__dirname + '/public');
app.use(express.json());
app.use('/public', static);
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');



app.use(
  session({
    name: 'AuthCookie',
    secret: "The secret I can not say",
    saveUninitialized: true,
    resave: false
  })
);

app.use(async (req, res, next) => {

  if(req.session.user){
  	if(req.originalUrl == "/public/site.css"){
	//prevents /public/site.css from printing
  	}
  	else{
console.log(new Date().toUTCString() + ": " + req.method + " " + req.originalUrl + " " + "(Authenticated User)")
	}
}
else{
	if(req.originalUrl == "/public/site.css"){
	//prevents /public/site.css from printing

  	}
  	else{
console.log(new Date().toUTCString() + ": " + req.method + " " + req.originalUrl + " " + "(Non-Authenticated User)")
}
}
  next();

});
// authenticated;

app.use('/private', (req, res, next) => {
  
  if (!req.session.user) {

    return res.status(403).render("users/loginerror")
  } else {
    next();
  }
});


app.use('/login', (req, res, next) => {
  if (req.session.user) {
    return res.redirect('/private');
  } else {
    req.method = 'POST';
    next();
  }
});





configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});
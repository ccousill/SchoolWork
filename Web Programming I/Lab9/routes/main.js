const express = require('express');
const router  = express.Router();



router.get('/',async (req,res) =>{
	try{
		res.sendfile("public/index.html")
	}catch(e){
		console.log(e)
	}

});

module.exports = router;
const express = require('express');
const router = express.Router();
const data = require('../data');
const session = require('express-session');
const blogData = data.blog;
const userData = data.users;
const commentData = data.comments;
let {ObjectId} = require('mongodb');

//get /blog
router.get('/', async (req,res) =>{
	try{
		console.log("getting all blogs...")
		let blogList;

		//query strings for both skip and take
		if(req.query.skip && req.query.take){
			blogList = await blogData.readAllBlogs(req.query.skip, 2, req.query.take);
		}

		//query string for skip
		else if(req.query.skip){
			blogList = await blogData.readAllBlogs(req.query.skip, 0);
		}

		//query string for take
		else if(req.query.take){
			blogList = await blogData.readAllBlogs(req.query.take, 1);
		}

		//Reads blogs capped at 20
		else{
			blogList = await blogData.readAllBlogs();
		}

		res.json(blogList);
	}catch(e){
		res.status(500).json({error:e.toString()});
	}
});

// // get /blog/logout
router.get('/logout', async (req,res) =>{
	try{
		console.log("logging out")

		//ensures users is logged in
		if(!req.session.user)throw "you are already logged out"
		req.session.destroy();
		res.json("logged out successfully")
	}catch(e){
		res.status(400).json({error:e.toString()});
	}
});

//get /blog/:id
router.get('/:id', async (req,res) =>{
	try{
		console.log("getting one blog...")
		const blogById = await blogData.readBlog(req.params.id)
		res.json(blogById)
	}catch(e){
		res.status(400).json({error:e.toString()});
	}
});


// //post /blog
router.post('/', async (req,res) =>{
	try{
		console.log("posting a blog...")

		//ensures users is logged in
		if (!req.session.user) throw "you are not logged in!"
		const thisBlogData = req.body;
		if(!thisBlogData.title) throw "Must enter a title"
		if(!thisBlogData.body) throw "Must enter a body"
		const newBlog = await blogData.createBlog(thisBlogData.title,thisBlogData.body,req.session.user.username,req.session.user.userId);
		res.json(newBlog);
	}catch(e){
		res.status(400).json({error:e.toString()});
	}

});


//put /blog/:id
router.put('/:id', async (req,res) =>{
	try{
		//ensures users is logged in
		if (!req.session.user) throw "you are not logged in!"
		if(req.body == undefined) throw "must provide all fields"
		let body = req.body
		let newBody = {}
		if(body.title && body.body){
			newBody.title = body.title
			newBody.body = body.body
		}else{
			throw "must provide title and a body"
		}
		const patchedBlog = await blogData.updateBlog(req.params.id,req.session.user.userId,newBody);
		res.json(patchedBlog)
	}catch(e){
		res.status(400).json({error:e.toString()})
	}
});


//patch /blog/:id
router.patch('/:id', async (req,res) =>{
	try{
		//ensures users is logged in
		if (!req.session.user) throw "you are not logged in!"
	    const body = req.body
		if(body == undefined) throw "must provide fields"
		var newBody = {}
		if(body.title){
			newBody.title = body.title
		}
		if(body.body){
			newBody.body = body.body
		}
		if(!newBody) throw "could not update blog"
		const patchedBlog = await blogData.updateBlog(req.params.id,req.session.user.userId,newBody);
		res.json(patchedBlog)
	}catch(e){
		res.status(400).json({error:e.toString()})
	}
});


//post blog/:id/comments
router.post('/:id/comments', async (req,res) =>{
	try{
		console.log("posting a comment..")

		//ensures user is logged in
		if(!req.session.user) throw "you are not logged in!"
		if(!req.body.comment) throw "Must enter a comment"
		const newComment = await commentData.createComment(req.params.id,req.session.user.userId,req.session.user.username,req.body.comment)
		res.json(newComment)
	}catch(e){
		res.status(400).json({error:e.toString()});
	}


});


//delete blog/:blogId/:commentId
router.delete('/:blogId/:commentId', async (req,res) =>{
	try {
		console.log("deleting comment...")

		//ensures user is logged in
		if(!req.session.user) throw "you are not logged in!"
		const deletedComment = await commentData.deleteComment(req.params.blogId,req.params.commentId,req.session.user.userId);
		res.json("successfully deleted!")	
		}catch(e){
			res.status(400).json({error:e.toString()});
		}
});


//post /blog/signup
router.post('/signup', async (req,res) =>{
	try{
	  console.log("signing up...")
	  if(!req.body.name) throw "must enter a name"
      if(!req.body.username) throw "Must enter a username"
      if(!req.body.password) throw "Must enter a password"
      const newUser = await userData.createUser(req.body.name,req.body.username, req.body.password)
      req.session.user = {  id: newUser._id.toString(), username: req.body.username };
      res.json(newUser);
    }catch(e){
    	res.status(400).json({error:e.toString()});
    }
});


//post /blog/login
router.post('/login', async (req,res) =>{
	try{
		console.log("logging in...")
		if(req.session.user) throw "You are already logged in"
		if(!req.body.username) throw "Must enter a username"
	    if(!req.body.password) throw "Must enter a password"
	    const login = await userData.login(req.body.username,req.body.password)
	    if(!login)throw "username or password is incorrect"
	    req.session.user = { userId: login._id.toString(), username: login.username};
	    res.json(login)
    }catch(e){
        res.status(400).json({error:e.toString()});
    }

});



module.exports = router;


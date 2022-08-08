const mongoCollections = require('../config/mongoCollections');
const blog = mongoCollections.blog;
let {ObjectId} = require('mongodb');

module.exports = {
	async createBlog(title,body,username,id){
		if(typeof title !== 'string') throw 'Must provide a title'
		if(typeof body !== 'string') throw 'Must provide a body'
		const blogCollection = await blog();
		let newBlog = {
			title : title,
			body: body,
			userThatPosted : {_id : id , username: username},
			comments : []
		};

		//creates blog
		const insertBlog = await blogCollection.insertOne(newBlog);
		if(insertBlog.insertedCount === 0)throw 'Could not insert blog'
		return newBlog;
	},

	async readAllBlogs(n, action, m){
		const blogCollection = await blog();
		let blogList;

		
		if(action && isNaN(parseInt(n))) throw "query not a valid number"
		if((parseInt(n) <= 0) || (parseInt(n) > 100 )) throw "number must be between 1 and 100"

		//querys 
		if(action == 0){
			console.log("skip")
			blogList = await blogCollection.find({}).skip(parseInt(n)).limit(100).toArray();
		}

		//take limits at 100, if at 101, outputs 100
		else if(action == 1){
			console.log("take");
			blogList = await blogCollection.find({}).limit(parseInt(n)).toArray();
		}

		else if(action ==2){
			console.log("take and skip");
			if(isNaN(parseInt(m))) throw "query not a valid number"
			if((parseInt(m) <= 0) || (parseInt(m) > 100 )) throw "number must be between 1 and 100"
			blogList = await blogCollection.find({}).skip(parseInt(n)).limit(parseInt(m)).limit(100).toArray();
		}

		//neither limits to 20
		else{
			console.log("neither")
			blogList = await blogCollection.find({}).limit(20).toArray();
		}


		if(blogList.length == 0) throw "no blogs";
		return blogList
	},

	async readBlog(id){
	   const blogCollection = await blog();

	   //if Object id is invalid, will give invalid length error, must input correct length
	   let myId = ObjectId(id)
	   foundBlog = await blogCollection.findOne({_id : myId})
	   if (foundBlog === null) throw "could not find blog"
	   return foundBlog
	},

	async updateBlog(id, userId, blogBody){
		const blogCollection = await blog();
		let blogList = await this.readBlog(ObjectId(id));

		if(blogList.userThatPosted._id.toString() != userId) throw "Blog must be edited by user who posted"

		//updates blog with parameters
		if(blogBody.title){
			console.log("updating title....")
			blogList = await blogCollection.updateOne({_id : ObjectId(id)},{$set: {title:blogBody.title}})
		}
		if(blogBody.body){
			console.log("updating body....")
			blogList = await blogCollection.updateOne({_id: ObjectId(id)}, {$set: {body:blogBody.body}})
		}
		return blogList
	}


}


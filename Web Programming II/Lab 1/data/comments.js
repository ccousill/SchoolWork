const mongoCollections = require('../config/mongoCollections');
const blog = mongoCollections.blog;
let {ObjectId} = require('mongodb');

module.exports = {

	async createComment(blogId,userId,username,comment){
		const blogCollection = await blog();
		if(typeof comment !== 'string') throw 'Must provide a comment'
		blogFound = await blogCollection.findOne({_id:ObjectId(blogId)})
		if(blogFound === null) throw "Blog not found to comment on"
		let newComment = {
			_id : new ObjectId(),
			userThatPostedComment : {_id:userId, username:username},
			comment : comment
		}

		//updates blog post and pushes comment
		const updatedBlog = await blogCollection.update({_id:ObjectId(blogId)}, {$push:{comments:newComment}})
		return newComment;
	},

	async deleteComment(blogId,commentId,userId){
		const blogCollection = await blog();
		blogFound = await blogCollection.findOne({_id:ObjectId(blogId)})
		if(blogFound === null) throw "Blog not found to delete Comment"
		var array = blogFound.comments;
		var newArray = []
		for(let i = 0; i < blogFound.comments.length; i++){
			if(array[i]._id != commentId){
				newArray.push(array[i])
			}
			else{
					if(array[i].userThatPostedComment._id != userId) throw 'No access to delete comment'
			}
		}

		for(let i = 0; i < blogFound.comments.length;i++){
			if(blogFound.comments[i]._id.toString() == commentId ){
				console.log("found comment!")
				//updates blog with deleted comment
			}	const updatedBlog = await blogCollection.updateOne({_id:ObjectId(blogId)}, {$set: {comments: newArray}})
		}
		return `Id ${commentId} was removed`;
	}

}
const mongoCollections = require('../config/mongoCollections');
let {ObjectId} = require('mongodb');
const { user } = require('../config/mongoCollections');
const { recipe } = require('../config/mongoCollections');
const { createKitchen,deleteKitchen } = require('./myKitchen');
const { deleteImage } = require('./images');

module.exports = {

	async createUser(id, name){
		if((typeof(id) !== 'string') || (id.trim().length === 0)) throw 'must supply id';
		if((typeof(name) !== 'string') || (name.trim().length === 0)) throw 'must supply name';
		const userCollection = await user();
		let newUser = {
			_id : id,
            name : name,
			recipes: [],
			kitchenID: id,
			likes:[]
		};

		const insertUser = await userCollection.insertOne(newUser);
		if(insertUser.insertedCount === 0) throw 'Could not insert user';


		await createKitchen(id)
		return newUser;
	},

	async createUserWithSocial(id, name){
		if((typeof(id) !== 'string') || (id.trim().length === 0)) throw 'must supply id';
		if((typeof(name) !== 'string') || (name.trim().length === 0)) throw 'must supply name';
		const userCollection = await user();
		let myId = id;
		var foundUser = await userCollection.findOne({_id:myId});
		if(foundUser === null) {
			return this.createUser(id, name);
		}
		return foundUser;
	},

	async toggleLikeRecipe(id,userId){
		if((typeof(id) !== 'string') || (id.trim().length === 0)) throw 'must supply id';
		if((typeof(userId) !== 'string') || (userId.trim().length === 0)) throw 'must supply userId';
		const recipeCollection = await recipe();
		let myId = ObjectId(id);
		var foundRecipe = await recipeCollection.findOne({_id:myId});
		if(foundRecipe === null) throw "could not find recipe"
		var recipeLikes = foundRecipe.likes;
		if(recipeLikes.includes(userId)){
			var newArray = recipeLikes.filter((userid) => userid !== userId)
			const updatedLikes = await recipeCollection.updateOne({_id:myId}, {$set: {likes: newArray}})
			if(updatedLikes === null) throw "could not find update recipe likes"

			return updatedLikes
		}else{
			recipeLikes.push(userId);
			const updatedLikes = await recipeCollection.updateOne({_id:myId}, {$set: {likes: recipeLikes}})
			if(updatedLikes === null) throw "could not find update recipe likes"
			return updatedLikes
		}
	},

	async deleteLikeRecipe(id,userId){
		if((typeof(id) !== 'string') || (id.trim().length === 0)) throw 'must supply id';
		if((typeof(userId) !== 'string') || (userId.trim().length === 0)) throw 'must supply userId';
		const recipeCollection = await recipe();
		let myId = ObjectId(id);
		var foundRecipe = await recipeCollection.findOne({_id:myId});
		if(foundRecipe === null) throw "could not find recipe"
		var recipeLikes = foundRecipe.likes;
		if(recipeLikes.includes(userId)){
			var newArray = recipeLikes.filter((userid) => userid !== userId)
			const updatedLikes = await recipeCollection.updateOne({_id:myId}, {$set: {likes: newArray}})
			if(updatedLikes === null) throw "could not find update recipe likes"
			return updatedLikes
		}
		return recipeLikes
	},
	async deleteUserLike(id, recipeID){
		// id is userid
		// does not remove recipe like, only for cascade
		if((typeof(id) !== 'string') || (id.trim().length === 0)) throw 'must supply id';
		if(!recipeID) throw 'must supply recipeID';
		recipeID = recipeID.toString();
		const userCollection = await user();
		var foundUser = await userCollection.findOne({_id:id});
		if(foundUser === null) throw "could not find User"
		var userLikes = foundUser.likes;
		var newArray = userLikes.filter((recipeid) => recipeid !== recipeID)
		const updatedLikes = await userCollection.updateOne({_id:id}, {$set: {likes: newArray}})
		if(updatedLikes === null) throw "could not find update user likes"

		return updatedLikes
	},

	async deleteRecipe(id){
		if((typeof(id) !== 'object')) throw 'must supply id ??';
		const recipeCollection = await recipe();
		let myId = ObjectId(id);
		var foundRecipe = await recipeCollection.findOne({_id:myId});
		if(foundRecipe === null) throw "could not find recipe"

		for (let i = 0; i <foundRecipe.likes.length; i++) {
			await this.deleteUserLike(foundRecipe.likes[i],id);
		}
		await deleteImage(foundRecipe.image);

		const userCollection = await user();
		var foundUser = await userCollection.findOne({_id:foundRecipe.postedBy});
		var newArray = foundUser.recipes.filter((recipeid) => recipeid.toString() !== myId.toString())
		const updatedRecipes = await userCollection.updateOne({_id: foundRecipe.postedBy}, {$set: {recipes: newArray}})
		if(updatedRecipes === null) throw "could not delete user recipe reference";
		const deletedRecipe = await recipeCollection.deleteOne({_id: myId})
		if(deletedRecipe.deletedCount === 0) throw "could not delete recipe"
		return deletedRecipe
	},

	async getUserLikes(id){
		if((typeof(id) !== 'string') || (id.trim().length === 0)) throw 'must supply id';
		const userCollection = await user();
		let myId = id;
		var foundUser = await userCollection.findOne({_id:myId});
		if(foundUser === null) throw "could not find User"
		return foundUser.likes
	},

	async toggleLikes(id, recipeID){
		if((typeof(id) !== 'string') || (id.trim().length === 0)) throw 'must supply id';
		if((typeof(recipeID) !== 'string') || (recipeID.trim().length === 0)) throw 'must supply recipeID';
		const userCollection = await user();
		let myId = id;
		var foundUser = await userCollection.findOne({_id:myId});
		if(foundUser === null) throw "could not find User"
		var userLikes = foundUser.likes;
		if(userLikes.includes(recipeID)){
			var newArray = userLikes.filter((recipeid) => recipeid !== recipeID)
			const updatedLikes = await userCollection.updateOne({_id:id}, {$set: {likes: newArray}})
			if(updatedLikes === null) throw "could not find update user likes"
			await this.toggleLikeRecipe(recipeID,id)
			return updatedLikes
		}else{
			userLikes.push(recipeID);
			const updatedLikes = await userCollection.updateOne({_id:id}, {$set: {likes: userLikes}})
			if(updatedLikes === null) throw "could not find update user likes"
			await this.toggleLikeRecipe(recipeID,id)
			return updatedLikes
		}
	},

	async deleteUser(id){
		if((typeof(id) !== 'string') || (id.trim().length === 0)) throw 'must supply id';
		const userCollection = await user();
		var foundUser = await userCollection.findOne({_id:id});
		if(foundUser === null) throw "could not find User"

		await deleteKitchen(foundUser.kitchenID);

		for (let i = 0; i < foundUser.likes.length; i++) {
			await this.deleteLikeRecipe(foundUser.likes[i], id);
		}

		for (let i = 0; i < foundUser.recipes.length; i++) {
			await this.deleteRecipe(foundUser.recipes[i]);
		}

		const deleteUser = await userCollection.deleteOne( { "_id" : id} );
		if(deleteUser.deletedCount === 0) throw 'Could not delete user'

		return deleteUser;
	},
}


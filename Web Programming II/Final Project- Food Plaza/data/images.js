let {ObjectId} = require('mongodb');
const { image } = require('../config/mongoCollections');
const bluebird = require('bluebird');
const redis = require('redis');
const client = redis.createClient();
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

module.exports = {

	async createImage(imageString){
		if((typeof(imageString) !== 'string') || (imageString.trim().length === 0)) throw 'must supply imageString';
		const imageCollection = await image();
		let newImage = {
			imageString : imageString
		};
		const insertImage = await imageCollection.insertOne(newImage);
		if(insertImage.insertedCount === 0) throw 'Could not insert kitchen'
		return insertImage.insertedId;
	},
	
	async getImage(id){
		if((typeof(id) !== 'string') || (id.trim().length === 0)) throw 'must supply id';
		const imageCollection = await image();
		const foundImage = await imageCollection.findOne({_id: ObjectId(id)});
		if(foundImage === null) throw "could not find image"
		return foundImage;
	},

	async deleteImage(id){
		if((typeof(id) !== 'object')) throw 'must supply id 2';
		const imageCollection = await image();
		const deleteImage = await imageCollection.deleteOne({_id: ObjectId(id)});
		if(deleteImage.deletedCount === 0) throw "could not delete image"
		await client.hdelAsync('images', id.toString());
		return deleteImage;
	},

}


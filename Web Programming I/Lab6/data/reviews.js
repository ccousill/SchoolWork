const mongoCollections = require('../config/mongoCollections');
const reviews = mongoCollections.reviews
let { ObjectId } = require('mongodb');

function objId(id){
	if(!id) throw 'must be string'
	if(typeof id != 'string') throw 'must also be string';
	
	return ObjectId(id);

}


module.exports = {

	async createReview(title,reviewer,bookBeingReviewed,rating,dateOfReview,review){
		if(typeof title !== 'string') throw 'Must provide a title'
		if(typeof reviewer !== 'string') throw 'Must provide a reviewer'
		if(typeof bookBeingReviewed !== 'string') throw 'Must provide a book id'

		if(isNaN(Date.parse(dateOfReview))) throw 'must enter valid date'

		if(typeof rating !== 'number') throw 'Must provide a rating'
		if(typeof dateOfReview !== 'string') throw 'Must provide a date being reviewed'
		if(typeof review !== 'string') throw 'Must provide a review'


		const reviewCollection = await reviews();

			let newReview = {
				title:title,
				reviewer:reviewer,
				bookBeingReviewed: bookBeingReviewed,
				rating:rating,
				dateOfReview:dateOfReview,
				review: review
			};

			const insertReview = await reviewCollection.insertOne(newReview)
			if(insertReview.insertedCount === 0) throw 'could not insert review'

			const newId = insertReview.insertedId

			const reviewFinal = await this.readReview(newId);
			return reviewFinal;


	},

	async readAllReviews(){
		const reviewCollection = await reviews();

		const review = await reviewCollection.find({}).toArray();

		for(let i =0;i < review.length;i++){
			review[i]._id = review[i]._id.toString();
		}

		return review;
	},

	async readReview(id){
    if(!id || (typeof id != 'string' && typeof id != 'object')) throw 'Not a valid Id to search';


	const reviewCollection = await reviews();
	let x = id.toString();
	let ob = objId(x);

	review = await reviewCollection.findOne({_id: ob});
	if(review === null) throw 'No review with that id';
	review._id = x;


	return review;

	},

	async deleteReview(id){
    if(!id || (typeof id != 'string' && typeof id != 'object')) throw 'Not a valid Id to search';

		const reviewCollection = await reviews();

		let review= null;

		try{
			review = await this.readReview(id);
		}catch(e){
			console.log(e);
			return;

		}


		x = id.toString();
		ob = ObjectId(x)

		const deletionInfo = await reviewCollection.removeOne({_id:ob});

		if(deletionInfo.deletedCount === 0){
			throw 'could not delete review with that id'
		}
		return 'review was removed'

	}



}
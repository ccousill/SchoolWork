const express = require('express');
const router = express.Router();

const data = require('../data');
const reviewData = data.reviews;
const bookData = data.books;



router.get('/:bookId', async (request,response) =>{
	//gets an array of all reviews of a given book id
	array = []
	try{
		const book = await bookData.readBook(request.params.bookId);
		for(x of book.reviews){
			const review = await reviewData.readReview(x);
			array.push(review)
	    }
	    if(array.length == 0){
	    	response.status(200).json("No reviews for this book")
	    }
	    else{
	    response.status(200).json(array);
		}

	}catch(e){
		response.status(404).json({error:'book not found'});
	}



});

router.post('/:bookId', async (request,response) =>{
	//this posts a review to a book given a book id
	const thisReviewData = request.body;

	try{
		await bookData.readBook(request.params.bookId);
	}catch(e){
		response.status(400).json({error:'book not found'});
	}

	try{

		const newReview = await reviewData.createReview(thisReviewData.title,thisReviewData.reviewer,request.params.bookId,thisReviewData.rating,thisReviewData.dateOfReview,thisReviewData.review);
		const book = await bookData.readBook(request.params.bookId)
		await bookData.updateBook(book._id,newReview._id,1)


		response.status(200).json(newReview);


	}catch(e){
		response.status(400).json({error:e});
	}



});


router.delete('/:bookId/:reviewId', async (request,response) =>{
	//deletes the review
	obj ={}

	try{
		await reviewData.readReview(request.params.reviewId)
		obj.reviewId = request.params.reviewId
	}catch(e){
		response.status(404).json({error: 'review not found'});
		return;
	}

	try {
		await reviewData.deleteReview(request.params.reviewId);
		obj.deleted = "true"

		const book = await bookData.readBook(request.params.bookId);

		//this updates the book to delete the review id of the deleted review
		await bookData.updateBook(book._id,request.params.reviewId,2)

		response.status(200).json(obj);
	}catch(e){
		response.status(500).json({error : e});
	}




});

router.get('/:bookId/:reviewId', async (request,response) =>{
	//gets a specific review on a book given both ids
	try{
		const review = await reviewData.readReview(request.params.reviewId);
		response.status(200).json(review);
	}catch(e){
		response.status(404).json({error:'review not found'});
	}
	


});



module.exports = router;
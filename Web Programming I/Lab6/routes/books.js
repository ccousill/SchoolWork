const express = require('express');
const router = express.Router();

const data = require('../data');
const bookData = data.books;
const reviewData = data.reviews;

router.get('/', async (request,response) =>{


	try{
		const bookList = await bookData.readAllBooks();
		response.status(200).json(bookList);
	}catch(e){
		response.status(500).json({error:e});
	}

});

router.post('/', async (request,response) =>{
	
	const thisBookData = request.body;

	try{
		//this creates a book and posts to the database
		const newBook = await bookData.createBook(thisBookData.title,thisBookData.author,thisBookData.genre,thisBookData.datePublished,thisBookData.summary);
		bookNoReview = newBook
		//reviews is deleted so it wont display on the response
		delete bookNoReview.reviews

		response.status(200).json(bookNoReview);
	}catch(e){
		response.status(400).json({error:e});
	}



});

router.get('/:id', async (request,response) =>{
	//gets a particular book given an id
	try{
		const book = await bookData.readBook(request.params.id);
		response.status(200).json(book);
	}catch(e){
		response.status(404).json({error:'book not found'});
	}


});



router.put('/:id', async (request,response) =>{
	//This will update a book given all the fields
	const updatedData = request.body;
	if (!updatedData.title || !updatedData.author || !updatedData.genre || !updatedData.datePublished || !updatedData.summary) {
    response.status(400).json({ error: 'You must Supply All fields' });
    return;
  	}


	try{
		await bookData.readBook(request.params.id);
		
	}catch(e){
		response.status(404).json({error:'Book not found'});
		return;
	}
		const oldBook = await bookData.readBook(request.params.id);
		reviewsOfBook = oldBook.reviews
	

	try{
		const updatedBook = await bookData.updateBook(request.params.id,updatedData,0);
		bookNoReview = updatedBook
		delete bookNoReview.reviews

		response.status(200).json(bookNoReview);
	}catch(e){
		response.status(500).json({error:e});
	}


});



router.patch('/:id', async (request,response) =>{
	//Updates the book given a variant of fields
	const requestBody  =request.body;
	let updatedBook = {}
	try{
		const oldBook = await bookData.readBook(request.params.id);

		if(requestBody.title && (requestBody.title !== oldBook.title)) updatedBook.title = requestBody.title

 		if((requestBody.author.authorFirstName && (requestBody.author.authorFirstName !== oldBook.author.authorFirstName)) || requestBody.author.authorLastName && (requestBody.author.authorLastName !== oldBook.author.authorLastName)) updatedBook.author = requestBody.author

		if(requestBody.genre && (requestBody.genre !== oldBook.genre) && Array.isArray(updatedBook.genre)) {
			//this ensures that the given genre in the request does not match the genre in the database and pushes whatever new ones to it
			var oldGenre = oldBook.genre.slice(0)
			newGenre =  oldBook.genre
			for(let x of requestBody.genre){
				isNotEqual = true
				for(let y of newGenre){
					if(x==y){
		
						isNotEqual = false
					}

				}

				if(isNotEqual){
					newGenre.push(x);
				}
		
			}
		
			if(newGenre.length != oldGenre.length){
				updatedBook.genre = newGenre
			}
		} 

		if(requestBody.datePublished && (requestBody.datePublished !== oldBook.datePublished)) updatedBook.datePublished = requestBody.datePublished
		if(requestBody.summary && (requestBody.summary !== oldBook.summary)) updatedBook.summary = requestBody.summary
		if(requestBody.reviews && (requestBody.reviews !== oldBook.reviews)) updatedBook.reviews = requestBody.reviews

	}catch(e){
		response.status(404).json({error:'book not found'})
		return;
	}

	try{
		//this checks if any changes were made to the fields
		if(Object.keys(updatedBook).length === 0) throw "must provide values to change"
		const oldBook = await bookData.readBook(request.params.id);
		const updatedData = await bookData.updateBook(request.params.id, updatedBook,0);
		delete updatedBook.reviews
		if(Object.keys(updatedBook).length === 0) throw "must provide values to change"
		response.status(200).json(updatedBook);
	}catch(e){
		response.status(400).json({error: e});
	}


});


router.delete('/:id', async (request,response) =>{
	//deletes a book
	obj ={}
	try {
		await bookData.readBook(request.params.id);
		obj.bookId = request.params.id
	}catch(e){
		response.status(404).json({error: 'book not found'});
		return;
	}
	const book = await bookData.readBook(request.params.id);

	try {
		await bookData.deleteBook(request.params.id);
		obj.deleted = "true"

		const allReviews = await reviewData.readAllReviews();

		//this deletes all reviews associated with the book
		for(x of allReviews)
			if(book._id == x.bookBeingReviewed){
				await reviewData.deleteReview(x._id)
			}
		response.status(200).json(obj);
	}catch(e){
		response.status(500).json({error : e});
	}

});

module.exports = router;
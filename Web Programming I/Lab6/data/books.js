const mongoCollections = require('../config/mongoCollections');
const books = mongoCollections.books
let { ObjectId } = require('mongodb');

function objId(id){
	if(!id) throw 'must be string'
	if(typeof id != 'string') throw 'must also be string';
	
	return ObjectId(id);

}

module.exports = {

	async createBook(title,author,genre,datePublished,summary){
		if(typeof title !== 'string') throw 'Must provide a title'

		if(typeof author !== 'object') throw 'Must provide an author'
		if(typeof author.authorFirstName !== 'string') throw 'Must provide an author first name'
		if(typeof author.authorLastName !== 'string') throw 'Must provide an author last name'

		if(isNaN(Date.parse(datePublished))) throw 'must enter valid date'

		if(!Array.isArray(genre) || genre.length == 0) throw 'Must provide a list of genres'
		if(typeof datePublished !== 'string') throw 'Must provide a date'
		if(typeof summary !== 'string') throw 'Must provide a summary'


		const bookCollection = await books();


		let newBook = {
			title : title,
			author : author,
			genre : genre,
			datePublished : datePublished,
			summary : summary,
			reviews : []
		};



		const insertBook = await bookCollection.insertOne(newBook);
		if(insertBook.insertedCount === 0)throw 'Could not insert book'

		const newId = insertBook.insertedId
		const book = await this.readBook(newId)

		return book;



	},

	async readAllBooks(){

		const bookCollection = await books();
		const bookList = await bookCollection
			.find({}, { projection: { _id: 1, title: 1} } )
			.toArray();

		return bookList


	},

	async readBook(id){
	    if(!id || (typeof id != 'string' && typeof id != 'object')) throw 'Not a valid Id to search';

		const bookCollection = await books();
		let x = id.toString();
		let ob = objId(x);

		book = await bookCollection.findOne({_id: ob});
		if(book === null) throw 'No book with that id';
		book._id = x;


		return book;

	},

	async updateBook(id, updatedBook,canUpdate){
   		 if(!id || (typeof id != 'string' && typeof id != 'object')) throw 'Not a valid Id to search';

		const bookCollection = await books();
		const updatedBookData = {};

		const book = await this.readBook(id)
		let x = id.toString();
	    let ob = objId(x);


		if(updatedBook.title){
			if(typeof updatedBook.title !== 'string') throw 'Must provide a title'
			updatedBookData.title = updatedBook.title;
		}

		if(updatedBook.author){
			if(typeof updatedBook.author !== 'object') throw 'Must provide an author'
			if(typeof updatedBook.author.authorFirstName !== 'string') throw 'Must provide an author first name'
			if(typeof updatedBook.author.authorLastName !== 'string') throw 'Must provide an author last name'
			updatedBookData.author = updatedBook.author;
		}

		if(updatedBook.genre){
			console.log("here")
			if(!Array.isArray(updatedBook.genre) || updatedBook.genre.length == 0) throw 'Must provide a list of genres'
			updatedBookData.genre = updatedBook.genre;
		}

		if(updatedBook.datePublished){
			if(typeof updatedBook.datePublished !== 'string') throw 'Must provide a date'
			if(isNaN(Date.parse(updatedBook.datePublished))) throw 'must enter valid date'
			updatedBookData.datePublished = updatedBook.datePublished;
		}

		if(updatedBook.summary){
			if(typeof updatedBook.summary !== 'string') throw 'Must provide a summary'
			updatedBookData.summary = updatedBook.summary;
		}

		if(updatedBook.reviews){
			updatedBookData.reviews = book.reviews;
		}

		if(canUpdate == 1){
			return bookCollection.updateOne({_id: ob},{$addToSet:{reviews: updatedBook}})

		}

		if(canUpdate == 2){
			return bookCollection.updateOne({_id:ob},{$pull:{reviews: updatedBook}})

		}

		
	
	

		await bookCollection.updateOne({_id : ob}, {$set: updatedBookData});
		return await this.readBook(id);

	},

	async deleteBook(id){
	    if(!id || (typeof id != 'string' && typeof id != 'object')) throw 'Not a valid Id to search';

		const bookCollection = await books();
		let book = null;

		try{
			book = await this.readBook(id);
		}catch(e){
			console.log(e);
			return;

		}

		let x = id.toString();
	    let ob = objId(x);

		const deletionInfo = await bookCollection.removeOne({_id:ob});

		if(deletionInfo.deletedCount === 0){
			throw 'could not delete book with that id'
		}


		return true;

	}



}
const mongoCollections = require('./mongoCollections')
const movies = mongoCollections.movies
let { ObjectId } = require('mongodb');

function objId(id){
	if(!id) throw 'must be string'
	if(typeof id != 'string') throw 'must also be string';
	
	return ObjectId(id);

}

module.exports ={

	async create(title,plot,rating,runtime,genre,cast,info){
		if(!title || !plot || !rating || !runtime || !genre || !cast || !info) throw 'All field need to have valid values';
		if(typeof title != 'string' || typeof plot != 'string' || typeof rating != 'string' || typeof runtime != 'string' || typeof genre !='string') throw 'Invalid strings given';
		if(!Array.isArray(cast)) throw "Invalid string"
		for(x in cast){
			if(typeof cast[x] != 'string' || !cast[x].replace(/\s/g,'').length) throw 'cast must be have strings in it'
		}

		if(typeof info != 'object') throw "Info not an object"
		if(typeof info.director != 'string' || !info.director.replace(/\s/g,'').length) throw 'Need director'

		numLength = info.yearReleased.toString().length;
		todaysYear = new Date().getFullYear()
		if(typeof info.yearReleased != 'number' || numLength != 4 || !info.yearReleased || info.yearReleased < 1930 || info.yearReleased > todaysYear + 5  ) throw 'Not a valid year'


		const movieCollection = await movies();

			let newMovie = {
				Title : title,
				Plot : plot,
				Rating : rating,
				Runtime : runtime,
				Genre : genre,
				Cast : cast,
				Info : info	

			};

			const insertMovie = await movieCollection.insertOne(newMovie);
			if(insertMovie.insertedCount === 0) throw 'Could not insert movie'

			const newId = insertMovie.insertedId

			const movie = await this.get(newId);


			return movie;

	},

	async getAll(){

		const movieCollection = await movies();

		const movie = await movieCollection.find({}).toArray();

		for(let i =0;i < movie.length;i++){
			movie[i]._id = movie[i]._id.toString();
		}
		

		return movie;
		



	},

	async get(id){
		if(!id || typeof id != 'string' && typeof id != 'object') throw 'You must provide a valid to search for';

		const movieCollection = await movies();

		let x = id.toString();
		if(!x.replace(/\s/g,'').length) throw 'Invalid id'

		let ob = objId(x);

		movie = await movieCollection.findOne({_id:ob});

		if(movie === null) throw 'No movie with that id'
		movie._id = x;
		return movie;


	},




	async remove(id){
		if(!id || typeof id != 'string' && typeof id != 'object') throw 'You must provide a valid id to search for';

		const movieCollection = await movies();
		x = id.toString()

		if(!x.replace(/\s/g,'').length) throw 'Invalid id'

		ob = ObjectId(x)

		const deletionInfo = await movieCollection.removeOne({_id: ob});

		if(deletionInfo.deletedCount === 0){
			throw `Could not delete movie with id of ${id}`;
		}

		return `Id ${id} was removed`;

	},

	async rename(id, newTitle){
		if(!id || typeof id != 'string' && typeof id != 'object') throw 'You must provide a valid id to search for';
		if(!newTitle) throw 'Must provide new title'
		if(typeof newTitle != 'string') throw 'Title must be a string'

		const movieCollection = await movies();

		const updatedMovie = {
			Title : newTitle
		};

		let x = id.toString();

		if(!x.replace(/\s/g,'').length) throw 'Invalid id'

		let ob = objId(x);
	

		const updatedInfo= await movieCollection.updateOne({_id:ob}, {$set: updatedMovie});
		if(updatedInfo.modifiedCount === 0) throw 'Could not update movie'

		return await this.get(id);
	

	}

}
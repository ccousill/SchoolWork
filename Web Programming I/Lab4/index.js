const movies = require("./movies");
let { ObjectId } = require('mongodb');
const connection = require('./mongoConnection');


async function main(){


//Movie 1 created and logged
console.log("First movie created and logged: ")
johnWick= await movies.create("John Wick","An ex-hit-man comes out of retirement to track down the gangsters that killed his dog and took everything from him.","R", "1hr 41min","Action",["Keanu Reeves","Michael Nyqvist","Alfie Allen"],{director: "Chad Stahelski", yearReleased: 2014});
console.log(johnWick);



//movie 2 created
console.log("\nMovie 2 created")
const logan = await movies.create("Logan","In a future where mutants are nearly extinct, an elderly and weary Logan leads a quiet life. But when Laura, a mutant child pursued by scientists, comes to him for help, he must get her to safety.","R", "2hr 17min","Action",["Hugh Jackman","Patrick Stewart","Dafne Keen"],{director: "James Mangold", yearReleased: 2017});



//movies 1 and 2 logged
console.log("\nMovies 1 and 2 logged:")
const allMovies = await movies.getAll();
console.log(allMovies);


//movie 3 created and logged
console.log("\nMovie 3 created and logged: ")
const parasite = await movies.create("Parasite","Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.","R", "2hr 12min","Thriller",["Kang-ho Song","Sun-kyun Lee","Yeo-jeong Jo"],{director: "Bong Joon Ho", yearReleased: 2019});
console.log(parasite)


//renaming first movie and logged
console.log("\nRenamed first movie: ")
try{
johnWick = await movies.rename(johnWick._id, "Chris Wick");
console.log(johnWick);
}catch(e){
	console.log(e);
}


//removing movie 2
console.log("\nRemoving movie 2")
try{
const removeLogan = await movies.remove(logan._id);
console.log(`removed movie ${logan._id}`)
}catch(e){
	console.log(e);
}


//movies 1 and 3 logged
console.log("\nAll movies in database logged")
try{
const allMovies = await movies.getAll();
console.log(allMovies);
}catch(e){
	console.log(e);
}




//ERRORS

//bad movie creation
console.log("\nErrors:\n")
try{
const johnWick= await movies.create(3,"plot","R", "1hr 41min",8,"star",{director: "Chad Stahelski", yearReleased: 2014});
console.log(johnWick);
}catch(e){
	console.log(e)
}

//remove that doesnt exist
try{
const removeDNE = await movies.remove("507f1f77bcf86cd799439011");
}catch(e){
	console.log(e);
}


//rename that doesnt exist
try{
const chrisWick = await movies.rename("507f1f77bcf86cd799439011", "Chris Wick");
console.log(chrisWick);
}catch(e){
	console.log(e);
}


//rename movie with invalid params
try{
const chrisWick = await movies.rename(johnWick._id, 4);
console.log(johnWick);
}catch(e){
	console.log(e);
}


//rename movie with invalid params
try{
const chrisWick = await movies.get("507f1f77bcf86cd799439011");
}catch(e){
	console.log(e);
}


const db = await connection();
await db.serverConfig.close();


console.log('\nDone!')


}


main().catch((error)=> {
	console.log(error);
});
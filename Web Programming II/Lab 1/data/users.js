const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const bcrypt = require('bcrypt');
var ObjectId  = require('mongodb').ObjectId;

module.exports = {
	async createUser(name,username,password){
		if(typeof name !== 'string') throw 'Must provide a name'
		if(typeof username !== 'string') throw 'Must provide a username'
		if(typeof password !== 'string') throw 'Must provide a password'

	    const usersCollection = await users();
	    const hashed = await bcrypt.hash(password,10);
	    let newUser = {
	    	name: name,
	        username: username,
	        password: hashed
	    }

	    //creates user 
	    const insertUser = await usersCollection.insertOne(newUser);
	    if (insertUser.insertedCount === 0) throw "Could not register new user";
	    delete newUser.password;
	    return newUser

	},

	async login(username, password) {
		if(typeof username !== 'string') throw 'Must provide a username'
		if(typeof password !== 'string') throw 'Must provide a password'
		const usersCollection = await users(); 
		//finds user and checks username and password
		const user = await usersCollection.findOne({username: username});
	    if (user == null) throw "User name or password is incorrect";
	    const passwordCheck = await bcrypt.compare(password, user.password)
	    if (!passwordCheck) throw "User name or password is incorrect"
	    delete user.password
	    return user;
	}

}
const { kitchen } = require('../config/mongoCollections');

module.exports = {

	async createKitchen(id){
		if((typeof(id) !== 'string') || (id.trim().length === 0)) throw 'must supply id';
		const kitchenCollection = await kitchen();
		let newKitchen = {
			_id : id,
			food : []
		};
		const insertKitchen = await kitchenCollection.insertOne(newKitchen);
		if(insertKitchen.insertedCount === 0) throw 'Could not insert kitchen'
		return newKitchen;
	},

    async getKitchen(id){
		if((typeof(id) !== 'string') || (id.trim().length === 0)) throw 'must supply id ';
        const kitchenCollection = await kitchen();
        let myId = id;
        var foundKitchen = await kitchenCollection.findOne({_id:myId});
        if(foundKitchen === null) throw "could not find kitchen"
        return foundKitchen
    },

	async addItem(id, food){
		if(typeof(id) !== 'string' || typeof (food) !== 'object'){
			throw 'Invalid type: id must be string and food must be obj'
		}
		if(typeof (food.name) !== 'string' || typeof (food._id) !== 'string' || typeof (parseInt(food.quantity)) !== 'number' || typeof (food.unit) !== 'string'){
			throw 'Invalid food: Food must be an obj representing [quantity, unit of measure, item name]'
		}
		const kitchenCollection = await kitchen();
		let myId = id;
		var foundKitchen = await kitchenCollection.findOne({_id: myId});
		if(foundKitchen === null) throw "could not find kitchen"
		var myItem = {_id : food._id, quantity: food.quantity, unit: food.unit ,name: food.name }
		const updatedKitchen = await kitchenCollection.updateOne({_id : myId} , {$push : {food : myItem }});
		if(updatedKitchen.updateCount === 0)  throw 'Could not add food item to kitchen'
		return updatedKitchen;
	},
	async deleteItem(id, itemId){
		if((typeof(id) !== 'string') || (id.trim().length === 0)) throw 'must supply id';
		const kitchenCollection = await kitchen();
		let myId = id;
		var foundKitchen = await kitchenCollection.findOne({_id: myId});
		if(foundKitchen === null) throw "could not find kitchen"
		const updatedKitchen = await kitchenCollection.updateOne({_id : myId} , {$pull : {food : {_id: itemId}}});
		if(updatedKitchen.updateCount === 0)  throw 'Could not add food item to kitchen'
		return updatedKitchen;
	},
	async deleteKitchen(id){
		if((typeof(id) !== 'string') || (id.trim().length === 0)) throw 'must supply id';
		const kitchenCollection = await kitchen();
		let myId = id;
		var foundKitchen = await kitchenCollection.deleteOne({_id: myId});
		if(foundKitchen.deletedCount === 0) throw "could not find kitchen"
		return foundKitchen;
	}

}


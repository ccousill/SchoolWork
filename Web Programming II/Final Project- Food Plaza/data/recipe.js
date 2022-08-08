let { ObjectId } = require('mongodb');
const { recipe } = require('../config/mongoCollections');
const { user } = require('../config/mongoCollections');
const { kitchen } = require('../config/mongoCollections');
const { Heap } = require('heap-js');
const imageData = require('./images');

function intersection(setA, setB) {
    let _intersection = new Set()
    for (let elem of setB) {
        if (setA.has(elem)) {
            _intersection.add(elem)
        }
    }
    return _intersection
}


module.exports = {

    async createRecipe(name, img, prepTime, ing, steps, userId) {
        if (typeof (parseInt(prepTime)) !== 'number' || typeof (userId) !== 'string' || typeof (name) !== 'string') {
            throw 'Invalid input: userId must be a string, name must be a string, prepTime must be a number'
        }
        for (var i = 0; i < ing.length; i++) {
            if (typeof (ing[i]["name"]) !== 'string' || typeof (ing[i]["unit"]) !== 'string' || typeof (parseInt(ing[i]["count"])) !== 'number') {
                throw 'Invalid Ingredient format: all ingredients must be [name of type string, unit of type string, a numeric quantity]'
            }
        }
        for (var i = 0; i < steps.length; i++) {
            if (typeof (steps[i]) !== 'string') {
                throw 'Invalid Steps format: all steps must be a string'
            }
        }
        const recipeCollection = await recipe();
        const userCollection = await user();
        var foundUser = await userCollection.findOne({ _id: userId });
        if (foundUser === null) throw "could not find user"

        let newRecipe = {
            name: name,
            image: img,
            prepTime: prepTime,
            ingredients: ing,
            steps: steps,
            postedBy: userId,
            likes: []
        };
        const insertRecipe = await recipeCollection.insertOne(newRecipe);
        if (insertRecipe.insertedCount === 0) throw 'Could not insert recipe';
        const updatedUser = await userCollection.updateOne({ _id: userId }, { $push: { recipes: insertRecipe.insertedId } });
        if (updatedUser.modifiedCount === 0) throw 'Could not insert recipe to User';
        return newRecipe;
    },
    async updateRecipe(id, name, img, prepTime, ing, steps) {
        if (typeof (id) !== 'string') {
            throw 'Id must be a string'
        }
        if (typeof (parseInt(prepTime)) !== 'number' || typeof (name) !== 'string') {
            throw 'Invalid input: name must be a string, prepTime must be a number'
        }
        for (var i = 0; i < ing.length; i++) {
            if (typeof (ing[i]["name"]) !== 'string' || typeof (ing[i]["unit"]) !== 'string' || typeof (parseInt(ing[i]["count"])) !== 'number') {
                throw 'Invalid Ingredient format: all ingredients must be [name of type string, unit of type string, a numeric quantity]'
            }
        }
        for (var i = 0; i < steps.length; i++) {
            if (typeof (steps[i]) !== 'string') {
                throw 'Invalid Steps format: all steps must be a string'
            }
        }
        const recipeCollection = await recipe();
        const oldRecipe = await recipeCollection.findOne({_id: ObjectId(id)});
        if (oldRecipe === null) throw "could not find recipe";
        let changes = {
            name: name,
            image: img,
            prepTime: prepTime,
            ingredients: ing,
            steps: steps
        };
        const updatedRecipe = await recipeCollection.updateOne({_id: ObjectId(id)}, {$set: changes});
        if (updatedRecipe.modifiedCount === 0) throw 'Could not update recipe';
        imageData.deleteImage(oldRecipe.image);
        return updatedRecipe;
    },
    async getRecipeLikes(id) {
        if (typeof (id) !== 'string') {
            throw 'Id must be a string'
        }
        const recipeCollection = await recipe();
        let myId = ObjectId(id);
        var foundRecipe = await recipeCollection.findOne({ _id: myId });
        if (foundRecipe === null) throw "could not find recipe"
        return foundRecipe.likes
    },
    async searchRecipes(query) {
        if (typeof (query) !== 'string') {
            throw 'query must be a string'
        }
        const recipeCollection = await recipe();
        const agg = [
            {
                '$search': {
                    'index': 'recipe',
                    'autocomplete': {
                        'query': query,
                        'path': 'name',
                        'fuzzy': {
                            'maxEdits': 2,
                            'prefixLength': 3
                        }
                    }
                }
            }
        ];
        var results = await recipeCollection.aggregate(agg).toArray();
        if (results === null) throw "could not find recipe"
        return results
    },
    async getRecipe(id) {
        if (typeof (id) !== 'string') {
            throw 'Id must be a string'
        }
        const recipeCollection = await recipe();
        let myId = ObjectId(id);
        var foundRecipe = await recipeCollection.findOne({ _id: myId });
        if (foundRecipe === null) throw "could not find recipe"
        return foundRecipe
    },
    async getAllRecipes() {
        const recipeCollection = await recipe();
        var foundRecipe = await recipeCollection.find().limit(2000).toArray();
        if (foundRecipe.length === 0) throw "could not find recipes"
        return foundRecipe
    },
    async getUserRecipes(userId) {
        if (typeof (userId) !== 'string') {
            throw 'userId must be a string'
        }
        const userCollection = await user();
        var foundUser = await userCollection.findOne({ _id: userId });
        if (foundUser === null) throw "could not find user"
        var recipeList = foundUser.recipes;
        var recipesToDisplay = [];
        const recipeCollection = await recipe();
        for (var i = 0; i < recipeList.length; i++) {
            var foundRecipe = await recipeCollection.findOne({ _id: recipeList[i] });
            if (foundRecipe === null) throw "could not find recipe"
            else { recipesToDisplay.push(foundRecipe) }
        }
        return recipesToDisplay
    },

    async getLikedRecipes(userId) {
        if (typeof (userId) !== 'string') {
            throw 'userId must be a string'
        }
        const userCollection = await user();
        var foundUser = await userCollection.findOne({ _id: userId });
        if (foundUser === null) throw "could not find user"
        var recipeList = foundUser.likes;
        var recipesToDisplay = [];
        const recipeCollection = await recipe();
        for (var i = 0; i < recipeList.length; i++) {
            var foundRecipe = await recipeCollection.findOne({ _id: ObjectId(recipeList[i]) });
            if (foundRecipe === null) throw "could not find recipe"
            else { recipesToDisplay.push(foundRecipe) }
        }
        return recipesToDisplay
    },

    async getTryTheseRecipes(userId){
        if (typeof (userId) !== 'string') {
            throw 'userId must be a string'
        } 
        var recipesToDisplay = [];
        var recipeIds = [];
        const recipeCollection = await recipe();
        var count = 0; 
        while(recipesToDisplay.length <= 10 && count < 20){
            var foundRecipeArray = await recipeCollection.aggregate([{$sample : {size : 1}}]).toArray();
            var foundRecipe = foundRecipeArray[0];
            if(!recipeIds.includes(foundRecipe._id.toString()) && userId !== foundRecipe.postedBy.toString()) {
                recipeIds.push(foundRecipe._id.toString());
                recipesToDisplay.push(foundRecipe);
            }
            count++;
        }
        return recipesToDisplay;
    },
    async getRecommendedRecipes(userId){
        if (typeof (userId) !== 'string') {
            throw 'userId must be a string'
        }
        var recipesToDisplay = [];
        const recipeCollection = await recipe();
        var foundRecipes = await recipeCollection.find().limit(2000).toArray();

        const kitchenCollection = await kitchen();
        var foundKitchen = await kitchenCollection.findOne({ _id: userId });
        if (foundKitchen === null) throw "could not find kitchen"
        var kitchenIngredientsSet = new Set();

        for (let i = 0; i < foundKitchen.food.length; i++) {
            kitchenIngredientsSet.add(foundKitchen.food[i].name.toLowerCase())
        }

        var recipes = []
        for (let i = 0; i < foundRecipes.length; i++) {
            var recipesIngredientsSet = new Set();
            for (let j = 0; j < foundRecipes[i].ingredients.length; j++) {
                recipesIngredientsSet.add(foundRecipes[i].ingredients[j].name.toLowerCase())
            }
            var intersectionOf2Sets = intersection(recipesIngredientsSet,kitchenIngredientsSet);
            recipes.push([intersectionOf2Sets.size, foundRecipes[i]])
        }
        // max queue
        const PQForRecipe = (a, b) => b[0] - a[0];
        const priorityQueue = new Heap(PQForRecipe);
        priorityQueue.init(recipes);

        var count = 0;
        for (const recp of priorityQueue) {
            if(count === 15 || recp[0] === 0){
                break;
            }
            recipesToDisplay.push(recp[1])
            count++;
        }
        return recipesToDisplay;
    }
}


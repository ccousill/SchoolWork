const express = require('express');
const router = express.Router();
const data = require('../data');
const xss = require('xss');
const recipeData = data.recipe;
const imageData = data.images;
const userData = data.users;
const jwtDecode = require('jwt-decode');
const { ObjectId } = require('mongodb');

function validToken(token) {
    try {
        let decoded = jwtDecode(token);
        if (decoded.iss === 'https://securetoken.google.com/cs-554-final-project-f5747') {
            return true;
        }
    } catch (e) {
        return false;
    }
    return false;
}

router.post('/', async (req, res) => {
    if (!validToken(xss(req.body.token))) {
        res.status(403).send();
        return;
    }
    try {
        let body = req.body.recipe;
		if(!body) throw "please supply a body";
        body.name = xss(body.name);
        body.imageString = xss(body.imageString);
        body.prepTime = xss(body.prepTime);
        for(let i = 0; i < body.ingredients.length; i++){
            body.ingredients[i].name = xss(body.ingredients[i].name);
            body.ingredients[i].unit = xss(body.ingredients[i].unit);
            body.ingredients[i].count = xss(body.ingredients[i].count);
        }
        for(let i = 0; i < body.steps.length; i++){
            body.steps[i] = xss(body.steps[i]);
        }
        body.userId = xss(body.userId);
        let recipeImage = await imageData.createImage(body.imageString)
        let recipe = await recipeData.createRecipe(body.name, recipeImage, body.prepTime, body.ingredients, body.steps, body.userId)
        res.json(recipe)
    } catch (e) {
        res.status(404).json({ error: e.toString() });
    }
});

router.put('/:id', async (req, res) => {
    if (!validToken(xss(req.body.token))) {
        res.status(403).send();
        return;
    }
    try {
        let body = req.body.recipe;
        let id = xss(req.params.id);
        if((typeof(id) !== 'string') || (id.trim().length === 0)) throw 'must supply id';
		if(!body) throw "please supply a body";
        body.postedBy = xss(body.postedBy);
        if(body.postedBy !== jwtDecode(req.body.token).user_id) throw "cannot edit someone else's recipe"
        body.name = xss(body.name);
        body.imageString = xss(body.imageString);
        body.prepTime = xss(body.prepTime);
        for(let i = 0; i < body.ingredients.length; i++){
            body.ingredients[i].name = xss(body.ingredients[i].name);
            body.ingredients[i].unit = xss(body.ingredients[i].unit);
            body.ingredients[i].count = xss(body.ingredients[i].count);
        }
        for(let i = 0; i < body.steps.length; i++){
            body.steps[i] = xss(body.steps[i]);
        }
        let recipeImage = await imageData.createImage(body.imageString);
        let recipe = await recipeData.updateRecipe(id, body.name, recipeImage, body.prepTime, body.ingredients, body.steps);
        res.json(recipe);
    } catch (e) {
        res.status(404).json({ error: e.toString() });
    }
});

//this gets the liked recipe ids of a user
router.get('/getRecipeLikes/:id', async (req, res) => {
    try {
        let id = xss(req.params.id);
        if((typeof(id) !== 'string') || (id.trim().length === 0)) throw 'must supply id';
        let recipeLikes = await recipeData.getRecipeLikes(id);
        res.json(recipeLikes)
    } catch (e) {
        res.status(404).json({ error: e.toString() });
    }
});
router.get('/getRecommendedRecipes/:id', async (req,res) => {
    try{
        let id = xss(req.params.id);
        if((typeof(id) !== 'string') || (id.trim().length === 0)) throw 'must supply id';
        let tryTheseRecipeData = await recipeData.getRecommendedRecipes(id);
        res.json(tryTheseRecipeData);
    }catch(e){
        console.log(e)
        res.status(404).json({ error: e.toString() });
    }

});

router.get('/search/:query', async (req, res) => {
    try {
        let query = xss(req.params.query);
        if(typeof(query) !== 'string') throw 'must supply search query';
        let results = await recipeData.searchRecipes(query);
        res.json(results)
    } catch (e) {
        res.status(404).json({ error: e.toString() });
    }
});

router.get('/:id', async (req, res) => {
    try {
        let id = xss(req.params.id);
        if((typeof(id) !== 'string') || (id.trim().length === 0)) throw 'must supply id';
        let recipe = await recipeData.getRecipe(id);
        res.json(recipe)
    } catch (e) {
        res.status(404).json({ error: e.toString() });
    }
});

router.delete('/:id', async (req, res) => {
    if (!validToken(xss(req.body.token))) {
        res.status(403).send();
        return;
    }
    try {      
        let id = xss(req.params.id); 
        if((typeof(id) !== 'string') || (id.trim().length === 0)) throw 'must supply id';
        const recipe = await recipeData.getRecipe(id);
        if(recipe.postedBy !== jwtDecode(req.body.token).user_id) throw "cannot delete someone else's recipe"
        const deletedRecipe = await userData.deleteRecipe(ObjectId(id));
        res.json(deletedRecipe);
    } catch (e) {
        res.status(404).json({ error: e.toString() });
    }
});

router.get('/', async (req, res) => {
    try {
        let allRecipes = await recipeData.getAllRecipes();
        res.json(allRecipes)
    } catch (e) {
        res.status(404).json({ error: e.toString() });
    }
});

router.get('/userRecipe/:userId', async (req, res) => {
    try {
        let userId = xss(req.params.userId);
        if((typeof(userId) !== 'string') || (userId.trim().length === 0)) throw 'must supply userId';
        let userRecipes = await recipeData.getUserRecipes(userId);
        res.json(userRecipes)
    } catch (e) {
        res.status(404).json({ error: e.toString() });
    }
});

//this gets the data of liked recipes
router.get('/getLikedRecipes/:id', async (req,res) => {
    try{
        let id = xss(req.params.id);
        if((typeof(id) !== 'string') || (id.trim().length === 0)) throw 'must supply id';
        let likedRecipeData = await recipeData.getLikedRecipes(id)
        res.json(likedRecipeData)
    }catch(e){
        res.status(404).json({ error: e.toString() });
    }
    
});

router.get('/getTryTheseRecipes/:id', async (req,res) => {
    try{
        let id = xss(req.params.id);
        if((typeof(id) !== 'string') || (id.trim().length === 0)) throw 'must supply id';
    let tryTheseRecipeData = await recipeData.getTryTheseRecipes(id);
    res.json(tryTheseRecipeData);
}catch(e){
    res.status(404).json({ error: e.toString() });
}

});



module.exports = router;

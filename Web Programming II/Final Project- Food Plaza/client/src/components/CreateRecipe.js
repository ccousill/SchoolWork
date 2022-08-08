import React, { useState, useContext } from 'react';
import '../App.css';
import { AuthContext } from '../firebase/Auth';
import axios from 'axios';

function CreateRecipe() {
    const [food, setFood] = useState("");
    const [prepTime, setPrepTime] = useState("");
    const [image, setImage] = useState(undefined);
    const [steps, setSteps] = useState([]);
    const [stepInputs, setStepInputs] = useState([(
        <div className="buttonGroup">
            <label for="step1">Step 1: &nbsp;</label>
            <input id="step1" name="Step 1" value={steps[0]} type="text" onChange={(e) => steps[0] = e.target.value} required />
        </div>)]);
    const [count, setCount] = useState([]);
    const [unit, setUnit] = useState([]);
    const [ingredientName, setIngredientName] = useState([]);
    const [ingredientInputs, setingredientInputs] = useState([(
        <div className='buttonGroup'>
            <label for="qty1" hidden> Quantity: &nbsp; </label>
            <input id="qty1" type="number" placeholder="Quantity" value={count[0]} onChange={(e) => count[0] = e.target.value} required />
            <label for="unit1" hidden> Unit: &nbsp; </label>
            <select id="unit1" name="unit" onChange={(e) => unit[0] = e.target.value} required>
                <option value="" disabled selected>Unit</option>
                <option value="tsp">  tsp </option>
                <option value="tbsp">  tbsp </option>
                <option value="fl. oz">  fl. oz </option>
                <option value="ml">  ml </option>
                <option value="l">  l </option>
                <option value="g">  g </option>
                <option value="kg">  kg </option>
                <option value="oz">  oz </option>
                <option value="lb(s)">  lb </option>
                <option value="cup(s)">  cups </option>
                <option value="pint(s)">  pints </option>
                <option value="quart(s)"> quarts  </option>
                <option value="gallon(s)"> gallons  </option>
                <option value="N/A">  N/A </option>
            </select>
            <label for="food1" hidden> Food Name: &nbsp; </label>
            <input id="food1" type="text" placeholder="Food Name" value={ingredientName[0]} onChange={(e) => ingredientName[0] = e.target.value} required />

        </div>)])

    const { currentUser } = useContext(AuthContext);

    function addStep(e) {
        e.preventDefault();
        setStepInputs(stepInputs.concat([(
            <div className="buttonGroup">
                <label for={"step" + (stepInputs.length + 1)}>{"Step " + (stepInputs.length + 1) + ':'} &nbsp;</label>
                <input id={"step" + (stepInputs.length + 1)} name={"Step " + (stepInputs.length + 1)} value={steps[stepInputs.length]} type="text" onChange={(e) => steps[stepInputs.length] = e.target.value} required />
            </div>)]));
    }

    function removeStep(e) {
        e.preventDefault();
        if (stepInputs.length > 1) {
            setStepInputs(stepInputs.slice(0, -1));
            setSteps(steps.slice(0, stepInputs.length - 1));
        }
    }

    function addIngredient(e) {
        e.preventDefault();
        setingredientInputs(ingredientInputs.concat([(
            <div className="buttonGroup">
                <label for={"qty" + ingredientInputs.length} hidden> Quantity: &nbsp;</label>
                <input id={"qty" + ingredientInputs.length} type="number" placeholder="Quantity" value={count[ingredientInputs.length]} onChange={(e) => count[ingredientInputs.length] = e.target.value} required />
                <label for={"unit" + ingredientInputs.length} hidden> Unit: &nbsp;</label>
                <select id={"unit" + ingredientInputs.length} name="unit" onChange={(e) => unit[ingredientInputs.length] = e.target.value} required>
                    <option value="" disabled selected>Unit</option>
                    <option value="tsp">  tsp </option>
                    <option value="tbsp">  tbsp </option>
                    <option value="fl. oz">  fl. oz </option>
                    <option value="ml">  ml </option>
                    <option value="l">  l </option>
                    <option value="g">  g </option>
                    <option value="kg">  kg </option>
                    <option value="oz">  oz </option>
                    <option value="lb(s)">  lb </option>
                    <option value="cup(s)">  cups </option>
                    <option value="pint(s)">  pints </option>
                    <option value="quart(s)"> quarts  </option>
                    <option value="gallon(s)"> gallons  </option>
                    <option value="N/A">  N/A </option>
                </select>
                <label for={"food" + ingredientInputs.length} hidden> Food Name: &nbsp;</label>
                <input id={"food" + ingredientInputs.length} type="text" placeholder="Food Name" value={ingredientName[ingredientInputs.length]} onChange={(e) => ingredientName[ingredientInputs.length] = e.target.value} required />
            </div>
        )]));
    }

    function removeIngredient(e) {
        e.preventDefault();
        if (ingredientInputs.length > 1) {
            setingredientInputs(ingredientInputs.slice(0, -1));
            setIngredientName(ingredientName.slice(0, ingredientInputs.length - 1));
            setUnit(unit.slice(0, ingredientInputs.length - 1));
            setCount(count.slice(0, ingredientInputs.length - 1)); 
        }
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    async function handleSubmit(e) {
        e.preventDefault();
        let ingredientArray = []
        if (prepTime <= 0) {
            alert("Please have prep time greater than 0")
            return;
        }
        for (let i = 0; i < ingredientName.length; i++) {
            if (count[i] <= 0) {
                alert("Please have quantity greater than 0")
                return;
            }
            if (unit[i].trim().length === 0) {
                alert("Please select a Unit")
                return;
            }
            if (ingredientName[i].trim().length === 0) {
                alert("Please enter a food name")
                return;
            }
            ingredientArray.push({
                name: ingredientName[i],
                unit: unit[i],
                count: count[i]
            })
        }
        
        let recipeObject = {
            name: food,
            steps: steps,
            prepTime: prepTime,
            ingredients: ingredientArray,
            userId: currentUser.uid,
            imageString: await toBase64(image)
        };
        if(recipeObject.ingredients.length < 1){
            alert("Please have at least one ingredient");
            return;
        }

        if(recipeObject.steps.length < 1){
            alert("Please have at least one step");
            return;
        }

        let token = await currentUser.getIdToken();
        await axios.post('http://localhost:4000/recipe', { recipe: recipeObject, token: token })
            .then((res) => {
                window.location = "/recipes";
            }).catch((error) => {
                alert("could not post recipe")
                console.log(error)
            });

    }
    return (
        <div id="createRecipeForm" class="formBox">
            <h1 class="pageTitle title"> Create a recipe! </h1>
            <br />
            <form onSubmit={handleSubmit}>
                <label for="recipeName" hidden> Recipe Name: &nbsp;</label>
                <input class="formEntry" id="recipeName" placeholder="Recipe Name" type="text" value={food} onChange={(e) => setFood(e.target.value)} required />
                <label for="preptime" hidden> Prep Time (mins): &nbsp;</label>
                <input class="formEntry" id="preptime" placeholder="Preparation Time (in minutes)" type="number" value={prepTime} onChange={(e) => setPrepTime(e.target.value)} required />
                <div class="formEntry">
                    <label for="imageUpload">Image: &nbsp;</label>
                    <input id="imageUpload" type="file" accept=".png,.jpeg,.jpg" onChange={(e) => setImage(e.target.files[0])} required />
                </div>
                {ingredientInputs.map(
                    input => { return (input) }
                )}
                <div class="buttonGroup">
                    <button class="button" onClick={addIngredient}>Add Ingredient</button>
                    <button class="button" onClick={removeIngredient}>Remove Ingredient</button>
                </div>
                <br />
                {stepInputs.map(
                    input => { return (input) }
                )}
                <div class="buttonGroup">
                    <button class="button" onClick={addStep}>Add Step</button>
                    <button class="button" onClick={removeStep}>Remove Step</button>
                </div>
                <br />
                <input class="button" id="submitRecipe" type="submit" />
            </form>
        </div>
    )
}

export default CreateRecipe;

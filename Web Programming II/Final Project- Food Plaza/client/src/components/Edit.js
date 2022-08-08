import React, { useContext, useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import {AuthContext} from "../firebase/Auth";
import {ObjectID} from "bson";
import EditIngredientsList from "./EditIngredientsList";
import EditStepsList from "./EditStepsList";
import EditName from "./EditName";
import EditTime from "./EditTime";

function Edit(props) {
    const [loading, setLoading] = useState(true)
    const { currentUser } = useContext(AuthContext);
    const [recipe, setRecipe] = useState([]);
    const [name, setName] = useState("");
    const [prepTime, setPrepTime] = useState(0);
    const [steps, setSteps] = useState([]);
    const [ing, setIng] = useState([]);
    const [image, setImage] = useState(undefined);

    const handleEditIng = (id,count,unit,name) =>{
        var objIndex = ing.findIndex((item) => item._id === id);
        if(count){
            ing[objIndex].count = count
        }
        if(unit){
            ing[objIndex].unit = unit
        }
        ing[objIndex].name = name

        setIng(ing)
    }

    const addIngCall= async (count, unit, name) => {
        const newIng = {
            _id: new ObjectID(),
            name: name,
            unit: unit,
            count: count
        }
        const newItemList = [...ing, newIng];
        setIng(newItemList);
    }

    const deleteIngCall= async (id) => {
        const newIngList = ing.filter((item) => item._id.toString() !== id.toString() );
        setIng(newIngList);
    }

    const handleEditStep = (id,name) =>{
        var objIndex = steps.findIndex((step) => step._id === id);
        steps[objIndex].name = name
        setSteps(steps)
    }

    const handleEditName = (name) =>{
        setName(name)
    }

    const handlePrepTime = (prepTime) =>{
        setPrepTime(prepTime)
    }

    const addStepCall= async (name) => {
        const newStep = {
            _id: new ObjectID(),
            name: name
        }
        const newStepList = [...steps, newStep];
        setSteps(newStepList);
    }

    const deleteStepCall= async (id) => {
        const newStepList = steps.filter((step) => step._id !== id );
        setSteps(newStepList);
    }

    const saveDataToServer= async () => {
        if(prepTime<1) {
            alert("there is an error in the prep time, positive & non zero val only: ")
            return
        }
        if(!name && name.trim().length === 0) {
            alert("there is an error in the name please fill in")
            return
        }
        for (let i = 0; i < ing.length; i++) {
            if(!ing[i].name && ing[i].name.trim().length === 0){
                alert("there is an error in the ingredients name line: " + (i+1) +" (" + ing[i].count + " " + ing[i].unit + ")" )
                return
            }
        }
        for (let i = 0; i < steps.length; i++) {
            if(!steps[i].name && steps[i].name.trim().length === 0){
                alert("there is an error in the steps line: " + (i+1))
                return
            }
        }
        if(!image){
            alert("missing image please include an image");
            return
        }
        var newArrayOfIngredients = ing;
        for (let i = 0; i < newArrayOfIngredients.length; i++) {
            delete newArrayOfIngredients[i]["_id"];
        }
        setIng(newArrayOfIngredients)

        if(ing.length < 1){
            alert("Must have at least 1 ingredient");
            return
        }

        var newArrayOfSteps= steps;
        for (let i = 0; i < newArrayOfSteps.length; i++) {
            delete newArrayOfSteps[i]["_id"];
        }
        for (let i = 0; i < newArrayOfSteps.length; i++) {
            newArrayOfSteps[i] = newArrayOfSteps[i].name;
        }
        setSteps(newArrayOfSteps)

        if(steps.length < 1){
            alert("Must have at least 1 step");
            return
        }
        let recipeObject = {
            _id: recipe["_id"],
            name: name,
            steps: steps,
            prepTime: prepTime,
            ingredients : ing,
            postedBy : currentUser.uid,
            likes: recipe["likes"],
            imageString: await toBase64(image)
        };

        let token = await currentUser.getIdToken();
        await axios.put(`http://localhost:4000/recipe/${recipeObject._id}`, {recipe: recipeObject, token: token})
        .then((res) => {
            window.location = `/recipe/${recipeObject._id}`;
        }).catch((error) => {
            alert("could not edit recipe")
            console.log(error)
        });
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    useEffect(() => {
        async function fetchData() {
            try {

                const { data } = await axios.get(`http://localhost:4000/recipe/${props.match.params.id}`)
                if(data.postedBy !== currentUser.uid){
                    window.location.href = '/recipes'
                }
                for (let i = 0; i < data.ingredients.length; i++) {
                    data.ingredients[i]["_id"] = new ObjectID();
                }
                var newArrayOfSteps= [];
                for (let i = 0; i < data.steps.length; i++) {
                    newArrayOfSteps.push({
                        _id: new ObjectID(),
                        name: data.steps[i]
                    });
                }
                setIng(data.ingredients);
                setSteps(newArrayOfSteps);
                setRecipe(data);
                setName(data.name)
                setPrepTime(data.prepTime)
                setLoading(false)
            } catch (e) {
                console.log(e);
            }

        }
        fetchData();

    }, [currentUser, props.match.params.id])


    if(loading){
        return ( <h1> loading...</h1>)
    }else{
        if(ing){
            return (
                <div className='childId'>
                    <div id="editRecipeForm" className='item-list formBox'>

                        <h1 id="kitchenTitle" className="pageTitle title">Edit Recipe</h1>
                        <label htmlFor="imageUpload">Image: &nbsp;</label>
                        <input id="imageUpload" type="file" accept=".png,.jpeg,.jpg"
                               onChange={(e) => setImage(e.target.files[0])} required/>
                        <EditName defName={name} handleEditName={handleEditName}></EditName>
                        <EditTime defPrepTime={prepTime} handleEditTime={handlePrepTime}></EditTime>
                        <EditIngredientsList ings={ing} handleAddItem={addIngCall} handleDeleteItem={deleteIngCall} handleEditItem={handleEditIng}/>
                        <EditStepsList steps={steps} handleAddStep={addStepCall} handleDeleteStep={deleteStepCall} handleEditStep={handleEditStep}/>
                        <button id="save-button" className='button' onClick={() => saveDataToServer()}>Save</button>
                    </div>
                </div>
            )

        }
    }

    return (
        <div className='childId'>
            <h1>My Kitchen</h1>
            error
        </div>
    )
}

export default Edit;

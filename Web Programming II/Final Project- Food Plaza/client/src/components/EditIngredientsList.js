import React, { useState } from "react";
import Ingredient from "./EditIngredient";


function EditIngredientsList({ ings, handleAddItem, handleDeleteItem, handleEditItem }) {
    const AddIng = ({ handleAddIng }) => {
        const [name, setNameText] = useState('');
        const [count, setCount] = useState('');
        const [unit, setUnitText] = useState('');
        const characterLimit = 200;

        const handleChange = (event) => {
            if (characterLimit - event.target.value.length >= 0) {
                setNameText(event.target.value);
            }
        };

        const handleSaveClick = () => {
            if (count <= 0) {
                alert("Please have count greater than 0")
                return;
            }
            if (unit.trim().length === 0) {
                alert("Please select a Unit")
                return;
            }
            if (name.trim().length === 0) {
                alert("Please enter a food name")
                return;
            }
            if (name.trim().length > 0) {
                handleAddIng(count, unit, name);
                setNameText('');
            }
        };

        return (
            <div className="formbox">
                <br />
                <div id="add-food">
                    <label hidden> Food name: &nbsp; </label>
                    <input type="text" value={name} placeholder="Ingredient name" onChange={handleChange} required />
                    <br />
                    <br />
                    <label hidden> Count: &nbsp; </label>
                    <input type="number" placeholder="Count" value={count} onChange={(e) => setCount(e.target.value)} required />
                    <br />
                    <br />
                    <label hidden> Unit: &nbsp; </label>
                    <select name="unit" onChange={(e) => setUnitText(e.target.value)} required>
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
                </div>
                <br />
                <button className="button" id="saveButton" onClick={handleSaveClick}>
                    Add Item
                </button>
            </div>
        );
    };

    return (
        <div className="childId">
            {
                ings.map((ing) => <Ingredient id={ing._id} defCount={ing.count} defUnit={ing.unit} defName={ing.name} handleDeleteItem={handleDeleteItem} handleEditItem={handleEditItem} />)
            }
            <AddIng handleAddIng={handleAddItem} />
        </div>
    );
}

export default EditIngredientsList;
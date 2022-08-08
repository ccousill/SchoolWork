import React, { useEffect, useState } from "react";

function Ingredient({ id, defCount, defUnit, defName, handleDeleteItem, handleEditItem }) {
    const [name, setNameText] = useState(defName);
    const [count, setCount] = useState(defCount);
    const [unit, setUnitText] = useState(defUnit);
    function update(count, unit, name) {
        if (unit && unit.trim().length !== 0) {
            handleEditItem(id, count, unit, name);
            setUnitText(unit)
            return
        }
        if (count && parseInt(count) > 0) {
            setCount(count);
            handleEditItem(id, count, unit, name);
            return
        }
        handleEditItem(id, count, unit, name);
        setNameText(name)
        return
    }
    useEffect(() => {
        setNameText(defName)
        setCount(defCount)
        setUnitText(defUnit)

    }, [defCount, defUnit, defName])

    return (
        <div className="buttonGroup">
            <label htmlFor={"qty" + id} hidden> Count: &nbsp;</label>
            <input id={"qty" + id} type="number" placeholder="Count"
                value={count}
                onChange={(e) => update(e.target.value, null, name)} required />
            <label htmlFor={"unit" + id} hidden> Unit: &nbsp;</label>
            <select defaultValue={unit} id={"unit" + id} name="unit"
                onChange={(e) => update(null, e.target.value, name)} required>
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
            <label htmlFor={"food" + id} hidden> Food Name: &nbsp;</label>
            <input id={"food" + id} type="text" placeholder="Food Name"
                value={name}
                onChange={(e) => update(null, null, e.target.value)} required />
            <button id="remove-button" className='button' onClick={() => handleDeleteItem(id)}>Remove</button>
        </div>
    );


}

export default Ingredient;

import React, {useEffect, useState} from "react";

function Step({id, defName, handleDeleteStep,handleEditStep}) {
    const [name, setNameText] = useState(defName);

    function update( name) {
        handleEditStep(id,name);
        setNameText(name)
        return
    }
    useEffect(() => {
        setNameText(defName)

    }, [defName])

    return (
        <div className="buttonGroup">
            <label htmlFor={"food" + id} hidden> Food Name: &nbsp;</label>
            <input id={"food" + id} type="text" placeholder="Food Name"
                   value={name}
                   onChange={(e) => update( e.target.value)} required/>
            <button id="remove-button" className='button' onClick={() => handleDeleteStep(id)}>Remove</button>
        </div>
    );


}

export default Step;

import React, {useEffect, useState} from "react";


function EditName({defName, handleEditName}) {
    const [name, setNameText] = useState('');

    function handleChange(newName) {
        setNameText(newName)
        handleEditName(newName);
    }
    useEffect(() => {
        setNameText(defName)
    }, [defName])

    return (
        <div>
            <label> Food name: &nbsp; </label>
            <input type="text" value={name} placeholder="Recipe name" onChange={(e) =>handleChange(e.target.value)} required/>
        </div>
    );
}

export default EditName;
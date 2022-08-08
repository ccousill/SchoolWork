import React, {useEffect, useState} from "react";

function EditTime({defPrepTime, handleEditTime}) {
    const [prepTime, setPrepTime] = useState(0);

    function handleChange(time) {
        setPrepTime(time)
        handleEditTime(time);
    }
    useEffect(() => {
        setPrepTime(defPrepTime)
    }, [defPrepTime])

    return (
        <div>
            <label htmlFor="preptime"> Prep Time (mins): &nbsp;</label>
            <input className="formEntry" id="preptime" placeholder="Preparation Time (in minutes)" type="number"
                   value={prepTime} onChange={(e) => handleChange(e.target.value)} required/>
        </div>
    );
}

export default EditTime;
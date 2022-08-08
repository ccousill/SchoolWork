import React, {useState} from "react";
import Step from "./EditStep";


function EditStepsList({steps,handleAddStep, handleDeleteStep,handleEditStep}) {
    const AddStep = ({ handleAddIng }) => {
        const [name, setNameText] = useState('');
        const characterLimit = 200;

        const handleChange = (event) => {
            if (characterLimit - event.target.value.length >= 0) {
                setNameText(event.target.value);
            }
        };

        const handleSaveClick = () => {
            if (name.trim().length === 0) {
                alert("Please enter a Step details")
                return;
            }
            if (name.trim().length > 0) {
                handleAddIng(name);
                setNameText('');
            }
        };

        return (
            <div className="formbox">
                <br/>
                <div id="add-food">
                    <label hidden> Food name: &nbsp; </label>
                    <input type="text" value={name} placeholder="Step" onChange={handleChange} required/>
                    <button className="button" id="saveButton"  onClick={handleSaveClick}>
                        Add Step
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="childId">
            {
                steps.map((ing) => <Step id={ing._id} defName={ing.name} handleDeleteStep={handleDeleteStep} handleEditStep={handleEditStep}/>)
            }
            <AddStep handleAddIng={handleAddStep} />
        </div>
    );
}

export default EditStepsList;
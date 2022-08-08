import React, { useContext } from "react";
import {AuthContext} from "../firebase/Auth";

const EditRecipeButton = ({recipeID, postedBy}) => {
    const { currentUser } = useContext(AuthContext);

    const EditRecipe = async (e) => {
        if (currentUser.uid === postedBy) {
            window.location.href = (`/edit/${recipeID}`)
        } else {
            alert("cannot edit other user's post");
        }
    };

    if((currentUser !== null) && (currentUser.uid === postedBy)){
        return (
            <div>
                <button onClick={EditRecipe} type="button">✏️</button>
            </div>
        )

    } 
    return (<div></div>);
};
export default EditRecipeButton;

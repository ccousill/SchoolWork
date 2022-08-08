import React, { useContext } from "react";
import axios from "axios";
import {AuthContext} from "../firebase/Auth";

const DeleteRecipeButton = ({recipeID, postedBy}) => {
    const { currentUser } = useContext(AuthContext);

    const deleteRecipe = async (e) => {
        if (currentUser.uid === postedBy) {
            let token = await currentUser.getIdToken();
            await axios.delete(`http://localhost:4000/recipe/${recipeID}`, {data: {token: token}}).then(()=>{
                window.location.href = "/recipes";
            }).catch((error) => {
                alert("Could not delete recipe")
                console.log(error)
            });
        } else {
            alert("cannot delete other user's post");
        }
    };

    if((currentUser !== null) && (currentUser.uid === postedBy)){
        return (
            <div>
                <button onClick={deleteRecipe} type="button">🗑️</button>
            </div>
        )

    } 
    return (<div></div>);
};
export default DeleteRecipeButton;

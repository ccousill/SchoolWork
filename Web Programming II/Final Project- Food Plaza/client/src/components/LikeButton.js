import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../firebase/Auth";

const LikeButton = ({ recipeID }) => {
    const [likeCount, setLikeCount] = useState(0);
    const [liked, setLiked] = useState(false);
    const [loading, setLoading] = useState(true)
    const { currentUser } = useContext(AuthContext);

    const handleChange = async (event) => {
        if(currentUser === null){
            window.location.href = "/signin";
            return
        }
        if (liked) {
            setLiked(false);
            setLikeCount(likeCount - 1);
        } else {
            setLiked(true);
            setLikeCount(likeCount + 1);
        }
        let token = await currentUser.getIdToken();
        await axios.post(`http://localhost:4000/users/toggleLike/${currentUser.uid}/${recipeID}`, {token: token}).catch((error) => {
            alert("Could not like/unlike recipe")
            console.log(error)
        });

    };


    useEffect(() => {
        async function fetchData() {
            try {
                const {data} = await axios.get(`http://localhost:4000/recipe/getRecipeLikes/${recipeID}`).catch((error) => {
                    alert("Could not fetch recipe likes")
                    console.log(error)
                });
                setLikeCount(data.length)
                var userLikes = await axios.get(`http://localhost:4000/users/getUserLikes/${currentUser.uid}`).catch((error) => {
                    alert("Could not fetch user likes")
                    console.log(error)
                });

                userLikes = userLikes.data;
                for (let i = 0; i < userLikes.length; i++) {
                    if(userLikes[i]===recipeID){
                        setLiked(true);
                        break;
                    }
                }

                setLoading(false)
            } catch (e) {
                console.log(e);
            }

        }
        fetchData();

    }, [currentUser, recipeID])


    if(loading){
        return (
            <div>
                <button onClick={handleChange} type="button">🤍 {likeCount}</button>
            </div>
        )
    }else{
        if(liked){
            return (
                <div>
                    <button onClick={handleChange} type="button">💖 {likeCount}</button>
                </div>
            )

        }else {
            return (
                <div>
                    <button onClick={handleChange} type="button">🤍 {likeCount}</button>
                </div>
            )
        }
    }

};
export default LikeButton;

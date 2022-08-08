import React, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { makeStyles, Card, CardMedia, CardHeader } from '@material-ui/core';
import { AuthContext } from "../firebase/Auth";
import AllRecipeGrid from "./AllRecipeGrid";


const useStyles = makeStyles({
  card: {
    maxWidth: 300,
    height: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 5,
    border: '1px solid #178577',
    boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);',
    padding: '10px'
  },
  titleHead: {
    borderBottom: '1px solid #178577',
    fontWeight: 'bold'
  },
  grid: {
    flexGrow: 1,
    flexDirection: 'row'
  },
  media: {
    height: '100%',
    width: '100%'
  }
});

function Recipes() {
  const [userRecipes, setUserRecipe] = useState([]);
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [tryTheseRecipes, setTryTheseRecipes] = useState([]);
  const [error, setError] = useState(true);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useContext(AuthContext);
  const classes = useStyles();

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`http://localhost:4000/recipe/userRecipe/${currentUser.uid}`).catch((error) => {
          alert("could not get user Recipe data")
          console.log(error)
        });

        const likedRecipesArray = await axios.get(`http://localhost:4000/recipe/getLikedRecipes/${currentUser.uid}`).catch((error) => {
          alert("could not get Liked recipe data")
          console.log(error)
        });

        const tryTheseRecipesArray = await axios.get(`http://localhost:4000/recipe/getTryTheseRecipes/${currentUser.uid}`).catch((error) => {
          alert("could not get recommended recipes")
          console.log(error)
        });

        var myRecipeArray = [];
        var likedArray = [];
        var tryTheseArray = [];
        for (let i = 0; i < data.length; i++) {
          const img = await axios.get(`http://localhost:4000/images/${data[i].image}`).catch((error) => {
            alert("could not get recipe images")
            console.log(error)
          });

          myRecipeArray.push({ name: data[i].name, image: img.data, id: data[i]._id })
        }

        for (let i = 0; i < likedRecipesArray.data.length; i++) {
          const img = await axios.get(`http://localhost:4000/images/${likedRecipesArray.data[i].image}`).catch((error) => {
            alert("could not get liked recipe images")
            console.log(error)
          });
          likedArray.push({ name: likedRecipesArray.data[i].name, image: img.data, id: likedRecipesArray.data[i]._id })
        }

        for (let i = 0; i < tryTheseRecipesArray.data.length; i++) {
          const img = await axios.get(`http://localhost:4000/images/${tryTheseRecipesArray.data[i].image}`).catch((error) => {
            alert("could not get recommended recipe images")
            console.log(error)
          });
          tryTheseArray.push({ name: tryTheseRecipesArray.data[i].name, image: img.data, id: tryTheseRecipesArray.data[i]._id })
        }

        setUserRecipe(myRecipeArray);
        setLikedRecipes(likedArray);
        setTryTheseRecipes(tryTheseArray);
        setLoading(false);
      } catch (e) {
        setError(true);
        setLoading(false);
        console.log(e);
      }
    }
    fetchData();

  }, [currentUser])


  function myRecipesDisplay() {
    if (userRecipes.length > 0) {
      return (<div>
        <h1>My Recipes</h1>
        <ScrollMenu>
          {userRecipes.map((recipe) => (
            <div className="recipeCard">
              <Link className={classes.link} to={"/recipe/" + recipe.id}>
                <Card className={classes.card} variant='outlined'>
                  <CardHeader className={classes.titleHead} title={recipe.name} />
                  <CardMedia
                    className={classes.media}
                    component='img'
                    image={recipe.image}
                    title='recipe image'
                  />
                </Card>
              </Link>
            </div>
          ))}
        </ScrollMenu>
      </div>);
    }
  }

  function myLikedDisplay() {
    if (likedRecipes.length > 0) {
      return (<div>
        <h1>My Liked Recipes</h1>
        <ScrollMenu >
          {likedRecipes.map((recipe) => (
            <div className="recipeCard">
              <Link className={classes.link} to={"/recipe/" + recipe.id}>
                <Card className={classes.card} variant='outlined'>
                  <CardHeader className={classes.titleHead} title={recipe.name} />
                  <CardMedia
                    className={classes.media}
                    component='img'
                    image={recipe.image}
                    title='recipe image'
                  />
                </Card>
              </Link>
            </div>
          ))}
        </ScrollMenu>
      </div>)
    }
  }

  function tryTheseRecipesDisplay(){
    if(tryTheseRecipes.length > 0){
    return(
      <div className="childId">
          <h1>Try These Recipes</h1>
          <ScrollMenu>
            {tryTheseRecipes.map((recipe) => (
              <div className="recipeCard">
                <Link className={classes.link} to={"/recipe/" + recipe.id}>
                  <Card className={classes.card} variant='outlined'>
                    <CardHeader className={classes.titleHead} title={recipe.name} />
                    <CardMedia
                      className={classes.media}
                      component='img'
                      image={recipe.image}
                      title='recipe image'
                    />
                  </Card>
                </Link>
              </div>
            ))}
          </ScrollMenu>
        </div>
      )
    }
  }

  if (loading) {
    return (<div><p>loading...</p></div>)
  } else {
    return (
      <div>

        {myRecipesDisplay()}

        {myLikedDisplay()}

        {tryTheseRecipesDisplay()}
        
        <div>
          <AllRecipeGrid />
        </div>
      </div>
    );
  }


}



export default Recipes;
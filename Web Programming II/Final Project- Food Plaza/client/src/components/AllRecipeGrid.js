import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { Card, CardHeader, CardMedia, Grid, makeStyles } from '@material-ui/core';

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
    const [allRecipes, setAllRecipe] = useState([]);
    const [loading, setLoading] = useState(true);
    const classes = useStyles();

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await axios.get('http://localhost:4000/recipe/').catch((error) => {
                    alert("Could not get all recipe data")
                    console.log(error)
                });

                var allRecipeArray = [];

                for (var i = 0; i < data.length; i++) {
                    const img = await axios.get(`http://localhost:4000/images/${data[i].image}`).catch((error) => {
                        alert("Could not get image data of recipes")
                        console.log(error)
                    });

                    allRecipeArray.push({ name: data[i].name, image: img.data, id: data[i]._id })
                }

                setAllRecipe(allRecipeArray);
                setLoading(false);
            } catch (e) {
                setLoading(false);
                console.log(e);
            }
        }
        fetchData();

    }, [])

    const buildCard = (recipe) => {
        return (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={recipe._id}>
                <Link className={classes.link} to={"/recipe/" + recipe.id}>
                <Card className={classes.card+" recipeCard" } variant='outlined'>
                    <CardHeader className={classes.titleHead} title={recipe.name} />
                    <CardMedia
                      className={classes.media}
                      component='img'
                      image={recipe.image}
                      title='recipe image'
                    />
                  </Card>
                  </Link>
            </Grid>
        );
    };

    if (loading) {
        return (<div><p>loading...</p></div>)
    } else {
        return (
            <div>
                <div>
                    <h1>All Recipes</h1>
                    <br />
                    <Grid container className={classes.grid} spacing={5}>
                        {allRecipes.map((recipe) => {
                            return buildCard(recipe);
                        })}
                    </Grid>
                </div>
            </div>
        );
    }


}



export default Recipes;
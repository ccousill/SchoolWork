import React, { useState, useEffect } from 'react';
import '../App.css';
import { makeStyles, Card, CardContent, CardMedia, Typography, CardHeader } from '@material-ui/core';
import axios from 'axios';
import LikeButton from "./LikeButton";
import DeleteRecipeButton from "./DeleteRecipeButton";
import EditRecipeButton from "./EditRecipeButton";

const useStyles = makeStyles({
    card: {
        maxWidth: 550,
        height: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 5,
        border: '1px solid #178577',
        boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);'
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
    },
    button: {
        color: '#178577',
        fontWeight: 'bold',
        fontSize: 12
    }
});

function Recipe(props) {
    const [recipeData, setRecipeData] = useState(undefined)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [image, setImage] = useState(undefined);
    const classes = useStyles();

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await axios.get(`http://localhost:4000/recipe/${props.match.params.id}`).catch((error) => {
                    alert("Could not get recipe")
                    console.log(error)
                });

                const img = await axios.get(`http://localhost:4000/images/${data.image}`).catch((error) => {
                    alert("could not get recipe image")
                    console.log(error)
                });

                setRecipeData(data);
                setImage(img.data);
                setLoading(false);
            } catch (e) {
                setError(true);
                setLoading(false);
                console.log(e);
            }

        }
        fetchData();

    }, [props.match.params.id])


    if (loading) {
        return (
            <div className="childId">
                <h2>Loading....</h2>
            </div>
        );
    } else {
        if (error) {
            return (<div className="childId">
                <h2>Error 404: Recipe Not Found!</h2>
            </div>);
        }
        else {
            return (
                <div className='childId'>
                    <br />
                <Card className={classes.card} variant='outlined'>
                    <CardHeader className={classes.titleHead} title={recipeData.name} />
                    <CardMedia
                        className={classes.media}
                        component='img'
                        image={image}
                        title='comics image'
                    />

                    <CardContent>
                        <Typography variant='body2' color='textSecondary' component='span'>
                            <dl>
                                <dt className='title'>Prep Time: &nbsp;{recipeData.prepTime} &nbsp; minutes</dt>
                                <div className="childId">
                                    <dt className='title'>Ingredients:</dt>
                                    {recipeData && recipeData.ingredients ? (
                                        <table>
                                            <tbody>
                                                {recipeData.ingredients.map((ingredient) => {
                                                    if (ingredient.unit !== "N/A") {
                                                        return (
                                                            <tr><td>{ingredient.count}&nbsp;{ingredient.unit}&nbsp;{ingredient.name}</td></tr>
                                                        )
                                                    }
                                                    else {
                                                        return (
                                                            <tr><td>{ingredient.count}&nbsp;{ingredient.name}</td></tr>
                                                        )
                                                    }
                                                })}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <dd>N/A</dd>
                                    )}
                                </div>
                                <div className='childId'>
                                    <dt className='title'>Steps:</dt>
                                    <ol>
                                        {recipeData.steps.map((step) => {
                                            return (
                                                <li>{step}</li>
                                            )
                                        })}
                                    </ol>
                                </div>
                            </dl>
                            <LikeButton recipeID={props.match.params.id}></LikeButton>
                            <br />
                            <DeleteRecipeButton recipeID={props.match.params.id} postedBy={recipeData.postedBy}></DeleteRecipeButton>
                            <br />
                            <EditRecipeButton recipeID={props.match.params.id} postedBy={recipeData.postedBy}></EditRecipeButton>
                        </Typography>
                    </CardContent>
                </Card>
                <br />
                </div>
            );
        }
    }
}


export default Recipe;

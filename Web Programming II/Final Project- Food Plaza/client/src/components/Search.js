import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import '../App.css';
import { makeStyles, Card, CardMedia, CardHeader } from '@material-ui/core';
import axios from 'axios';
import {useLocation} from "react-router";
import { AuthContext } from "../firebase/Auth";

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

function Search(props) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [SearchQuery, setSearchQuery] = useState(false);
    const [tryTheseRecipes, setTryTheseRecipes] = useState([]);
    const classes = useStyles();
    let query = useQuery();
    const { currentUser } = useContext(AuthContext);

    function useQuery() {
        const { search } = useLocation();

        return React.useMemo(() => new URLSearchParams(search), [search]);
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const tryTheseRecipesArray = await axios.get(`http://localhost:4000/recipe/search/${query.get('query')}`)
                var tryTheseArray = [];
                for (var i = 0; i < tryTheseRecipesArray.data.length; i++) {
                    const img = await axios.get(`http://localhost:4000/images/${tryTheseRecipesArray.data[i].image}`);
                    tryTheseArray.push({ name: tryTheseRecipesArray.data[i].name, image: img.data, id: tryTheseRecipesArray.data[i]._id })
                  }

                setSearchQuery(query.get("query"))
                setTryTheseRecipes(tryTheseArray);
                setLoading(false);
                setError(false)
            } catch (e) {
                setError(true);
                setLoading(false);
                console.log(e);
            }

        }
        fetchData();

    }, [query, currentUser])

    

    if (loading) {
        return (
            <div>
                <h2>Loading....</h2>
            </div>
        );
    } else {
        if (error) {
            return (<div>
                <h2>Error 404: Search Not Found!</h2>
            </div>);
        }
        else {
            return (
                <div>
                     
          <h1>Try These Recipes</h1>
          {tryTheseRecipes.map((recipe) => (
              <div className="recipeCard">
                <Link to={"/recipe/" + recipe.id}>
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
        
            </div>
            );
        }
    }
}


export default Search;

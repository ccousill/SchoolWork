import React, { useContext, useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { AuthContext } from "../firebase/Auth";
import { ObjectID } from 'bson';
import { Card, CardHeader, CardMedia, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import { ScrollMenu } from "react-horizontal-scrolling-menu";

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
function Kitchen() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true)
    const { currentUser } = useContext(AuthContext);
    const [recommendRecipes, setRecommendRecipe] = useState([]);
    const [itemsLength, setItemsLength] = useState(0);
    const classes = useStyles();

    const ItemList = ({ items, handleAddItem, handleDeleteItem }) => {
        return (
            <div className='childId'>
                {items.map((item) => <Item id={item._id} quantity={item.quantity} unit={item.unit} name={item.name} handleDeleteItem={handleDeleteItem} />)}
                <AddItem handleAddItem={handleAddItem} />
            </div>
        );
    };

    const AddItem = ({ handleAddItem }) => {
        const [name, setNameText] = useState('');
        const [quantity, setQuantity] = useState('');
        const [unit, setUnitText] = useState('');
        const characterLimit = 200;

        const handleChange = (event) => {
            if (characterLimit - event.target.value.length >= 0) {
                setNameText(event.target.value);
            }
        };

        const handleSaveClick = () => {
            if (quantity <= 0) {
                alert("Please have quantity greater than 0")
                return;
            }
            if (unit.trim().length === 0) {
                alert("Please select a Unit")
                return;
            }
            if (name.trim().length === 0) {
                alert("Please enter a food name")
                return;
            }
            handleAddItem(quantity, unit, name);
            setNameText('');
        };

        return (
            <div className="formbox">
                <br />
                <div id="add-food">
                    <label hidden> Food name: &nbsp; </label>
                    <input type="text" value={name} placeholder="Food name" onChange={handleChange} required />
                    <br />
                    <br />
                    <label hidden> Quantity: &nbsp; </label>
                    <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
                    <br />
                    <br />
                    <label hidden> Unit: &nbsp; </label>
                    <select name="unit" onChange={(e) => setUnitText(e.target.value)} required>
                        <option value="" disabled selected>Unit</option>
                        <option value="tsp">  tsp </option>
                        <option value="tbsp">  tbsp </option>
                        <option value="fl. oz">  fl. oz </option>
                        <option value="ml">  ml </option>
                        <option value="l">  l </option>
                        <option value="g">  g </option>
                        <option value="kg">  kg </option>
                        <option value="oz">  oz </option>
                        <option value="lb(s)">  lb </option>
                        <option value="cup(s)">  cups </option>
                        <option value="pint(s)">  pints </option>
                        <option value="quart(s)"> quarts  </option>
                        <option value="gallon(s)"> gallons  </option>
                        <option value="N/A">  N/A </option>
                    </select>
                </div>
                <br />
                <button className="button" id="saveButton" onClick={handleSaveClick}>
                    Save
                </button>
            </div>
        );
    };

    const Item = ({ id, quantity, unit, name, handleDeleteItem }) => {
        return (
            <div className='item'>
                {(unit === "N/A" ? <span>{quantity} {name}</span> : <span>{quantity} {unit} of {name}&nbsp;</span>)}
                <button id="remove-button" className='button' onClick={() => handleDeleteItem(id)}>Remove</button>
            </div>
        );
    };

    const addItem = async (quantity, unit, name) => {
        const newItem = {
            _id: new ObjectID(),
            quantity: quantity,
            unit: unit,
            name: name
        }
        let token = await currentUser.getIdToken();
        const newItemList = [...items, newItem];

        await axios.post(`http://localhost:4000/myKitchen/addItem/${currentUser.uid}`, { newItem: newItem, token: token })
            .then((res) => {
                setItems(newItemList);
                setItemsLength(itemsLength + 1);
            }).catch((error) => {
                alert("could not add item")
                console.log(error)
            });
    }

    const deleteItem = async (id) => {
        const newItemList = items.filter((item) => item._id !== id);

        let token = await currentUser.getIdToken();
        const data = {
            id: id,
            token: token
        };
        await axios.delete(`http://localhost:4000/myKitchen/removeItem/${currentUser.uid}`, { data: data })
            .then((res) => {
                setItems(newItemList);
                setItemsLength(itemsLength + 1);
            }).catch((error) => {
                alert("could not delete item")
                console.log(error)
            });

    }


    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await axios.get(`http://localhost:4000/myKitchen/${currentUser.uid}`).catch((error) => {
                    alert("could not fetch kitchen data")
                    console.log(error)
                });

                setItems(data["food"])

                var recipesToRecommend = await axios.get(`http://localhost:4000/recipe/getRecommendedRecipes/${currentUser.uid}`).catch((error) => {
                    alert("could not fetch recipes to recommend")
                    console.log(error)
                });

                recipesToRecommend = recipesToRecommend.data;
                var allRecommendedRecipeArray = [];

                for (var i = 0; i < recipesToRecommend.length; i++) {

                    const img = await axios.get(`http://localhost:4000/images/${recipesToRecommend[i].image}`).catch((error) => {
                        alert("could not get images for reccomended recipes")
                        console.log(error)
                    });

                    allRecommendedRecipeArray.push({ name: recipesToRecommend[i].name, image: img.data, id: recipesToRecommend[i]._id })
                }

                setRecommendRecipe(allRecommendedRecipeArray);
                setLoading(false)
            } catch (e) {
                console.log(e);
            }

        }
        fetchData();

    }, [currentUser, itemsLength])


    if (loading) {
        return (<h1> loading...</h1>)
    } else {
        if (items.length > 0) {
            return (
                <div>
                    <div>
                        <h1>Recommended Recipes</h1>
                        <h2 className="newH2">Selected based on your kitchen ingredients</h2>
                        <ScrollMenu>
                            {recommendRecipes.map((recipe) => (
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

                    <div id="kitchenForm" className='item-list formBox'>
                        <h1 id="kitchenTitle" className="pageTitle title">My Kitchen</h1>
                        <ItemList items={items} handleAddItem={addItem} handleDeleteItem={deleteItem} />
                    </div>
                </div>
            )
        }
        else {
            return (
                <div>
                    <div>
                        <div className="recipeCard">
                            <Card className={classes.card} variant='outlined'>
                                <CardHeader className={classes.titleHead} title="No Recipes To Display" />
                            </Card>
                        </div>
                    </div>
                    <div id="kitchenForm" className='item-list formBox'>
                        <h1 id="kitchenTitle" className="pageTitle title">My Kitchen</h1>
                        <ItemList items={items} handleAddItem={addItem} handleDeleteItem={deleteItem} />
                    </div>
                </div>
            )
        }
    }
}

export default Kitchen;

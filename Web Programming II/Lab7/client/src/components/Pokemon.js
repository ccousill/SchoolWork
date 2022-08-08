// import React, { useState, useEffect } from 'react';
import '../App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import actions from '../actions';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux'

const Pokemon = (props) => {
	const [pokemonData, setPokemonData] = useState(undefined)
	const [loading, setLoading] = useState(true)
	const [currentTrainer, setCurrentTrainer] = useState(undefined)
	const [error, setError] = useState(false)
	const dispatch = useDispatch();
	let pokemon = null
	let img = null;
	let types = [];
	let button = null;
	let typeList = null
	let weight = null;
	const allTrainers = useSelector((state) => state.trainers)

	if(currentTrainer === undefined){
		for(let i = 0; i < allTrainers.length; i++){
			if(allTrainers[i].selected === true){
				setCurrentTrainer(allTrainers[i])
				break;
			}
		}
	}

	useEffect(() => {
		async function fetchData() {
			try {
				const {data} = await axios.get('http://localhost:3000/pokemon/' + props.match.params.id)
				console.log(data)
				setPokemonData(data)
				setLoading(false)
			} catch (e) {
				setError(true)
				setLoading(false)
				console.log(e);
			}

		}
		fetchData();

		
	}, [props.match.params.id])

	const catchPokemon = (name, id) => {
	    dispatch(actions.catchPokemon(name, id));
  	};

  	const releasePokemon = (pokemon) => {
	    dispatch(actions.releasePokemon(pokemon));
  	};

	function setButton(pokemon, trainer, id){

		if(trainer !==undefined){
		for(let i=0; i < trainer.pokemon.length;i++){
				if(trainer.pokemon[i].name === pokemon.name){
					return (<button className="simple-button" onClick={() => releasePokemon(pokemon.name)}>
							Release
							 </button>)
				}
			}
		if(trainer.pokemon.length === 6){
			return (<button className="simple-button">
				Party is Full
				 </button>)
		}
		return (<button className="simple-button" onClick={() => catchPokemon(pokemon.name, id)}>
				Catch
				 </button>)

		}
		return (<button className="simple-button">
		Select a Trainer to Catch Pokemon
		 </button>)
	}

	

	if(loading){
		return (<h1> Loading... </h1>)
	}else{

		if(error){
		return (
			<div>
			Error 404
			</div>
		)

		}

		for(let i = 0; i < pokemonData.types.length; i++){
			types.push(pokemonData.types[i].type.name)
		}
		typeList = types.map((type, i) =>
  			<li key={i}> {type} </li>)

		pokemon = <h1> {pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)} </h1>
		img = <img alt = "Pokemon" src = {pokemonData.sprites.front_default} width="175" height="175" />
		button = setButton(pokemonData,currentTrainer,props.match.params.id)
		weight = <p>Weight : {pokemonData.weight}</p>
	}

	return (
		<div>
		
		{pokemon}
		{img}
		<br />
		<h2> Types: </h2>
		<ul>
		{typeList}
		</ul>
		<br />
		{weight}
		<br />
		{button}

		</div>
		
		);
};

export default Pokemon;

import { Link } from "react-router-dom";
import "../App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import actions from "../actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const PokemonList = (props) => {
  const [pokemonData, setPokemonData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [currentTrainer, setCurrentTrainer] = useState(undefined);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  let ul = null;
  let img = null;
  let NextPage = null;
  let PrevPage = null;
  let button = null;
  const allTrainers = useSelector((state) => state.trainers);

  if (currentTrainer === undefined) {
    for (let i = 0; i < allTrainers.length; i++) {
      if (allTrainers[i].selected === true) {
        setCurrentTrainer(allTrainers[i]);
        break;
      }
    }
  }
  console.log("Current Trainer", currentTrainer);
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/pokemon/page/" + props.match.params.page
        );
        console.log(data);
        setPokemonData(data);
        setLoading(false);
      } catch (e) {
        setError(true);
        setLoading(false);
        console.log(e);
      }
    }
    fetchData();
  }, [props.match.params.page]);

  const catchPokemon = (name, id) => {
    dispatch(actions.catchPokemon(name, id));
  };

  const releasePokemon = (pokemon) => {
    dispatch(actions.releasePokemon(pokemon));
  };

  function setButton(pokemon, trainer, id) {
    if (trainer !== undefined) {
      for (let i = 0; i < trainer.pokemon.length; i++) {
        if (trainer.pokemon[i].name === pokemon.name) {
          return (
            <button
              className="simple-button"
              onClick={() => releasePokemon(pokemon.name)}
            >
              Release
            </button>
          );
        }
      }
      if (trainer.pokemon.length === 6) {
        return <button className="simple-button">Party is Full</button>;
      }
      return (
        <button
          className="simple-button-catch"
          onClick={() => catchPokemon(pokemon.name, id)}
        >
          Catch
        </button>
      );
    }
    return (
      <button className="simple-button">
        Select a Trainer to Catch Pokemon
      </button>
    );
  }

  if (loading) {
    return <h1> Loading... </h1>;
  } else {
    if (error || pokemonData.results.length === 0) {
      return <div>Error 404</div>;
    }
    if (pokemonData) {
      ul =
        pokemonData.results &&
        pokemonData.results.map((pokemon) => {
          let spliced = pokemon.url.substring(0, pokemon.url.length - 1);
          let id = spliced.substring(spliced.lastIndexOf("/") + 1);
          let spriteUrl =
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
            id.toString() +
            ".png";
          img = <img alt="Pokemon" src={spriteUrl} width="175" height="175" />;
          button = setButton(pokemon, currentTrainer, id);
          return (
            <div className="pokemon" key={id}>
              <Link className="pokemonName" to={`/pokemon/${id}`}>
                  {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
				  <br/>
                {img}
              </Link>
              <br />
              {button}
            </div>
          );
        });

      if (pokemonData.next) {
        NextPage = (
          <Link className="pageNav" to={`/pokemon/page/${parseInt(props.match.params.page) + 1}`}>
            Next Page
          </Link>
        );
      }
      if (pokemonData.previous) {
        PrevPage = (
          <Link className="pageNav" to={`/pokemon/page/${parseInt(props.match.params.page) - 1}`}>
            Previous Page
          </Link>
        );
      }
    }
  }

  return (
    <div className="pokemonListPage">
      {PrevPage}
      <br />
      {NextPage}
      <h1 className="pokemonTitle"> Pokemon </h1>
      <div className="pokemonList">{ul}</div>
    </div>
  );
};

export default PokemonList;

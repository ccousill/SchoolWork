import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import "../App.css";
import axios from "axios";

const md5 = require("blueimp-md5");
const publickey = "064af32e99a8f1a057b985bd73eac44f";
const privatekey = "68316e2e638896c37d0e725ee3daf8044d8d58a5";
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
let baseUrl = null;
let url = null;
let id = null;
let des = null;

const Character = (props) => {
  const [loading, setLoading] = useState(true);
  const [CharacterData, setCharacterData] = useState(undefined);
  const [hasError, setHasError] = useState(false);
  let img = null;
  let name = null;
  let ul = null;

  useEffect(() => {
    console.log("on load useeffect");
    id = props.match.params.id;
    baseUrl = "https://gateway.marvel.com:443/v1/public/characters?id=" + id;
    url = baseUrl + "&ts=" + ts + "&apikey=" + publickey + "&hash=" + hash;

    async function fetchData() {
      try {
        const { data } = await axios.get(url);
        setCharacterData(data);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setHasError(true);
        setLoading(false);
      }
    }
    fetchData();
  }, [props.match.params.id]);

  if (loading) {
    return <h1> loading... </h1>;
  }

  if (hasError) {
    return <Redirect to="/ErrorPage" />;
  } else {
    let character = CharacterData.data.results[0];
    console.log(character);
    ul =
      character.comics.items &&
      character.comics.items.map((comic) => {
        let id = comic.resourceURI.substring(
          comic.resourceURI.lastIndexOf("/") + 1
        );
        return (
          <div key={id}>
            <Link to={`/comics/${id}`}>
              <div className="featuredComicButton">{comic.name}</div>
            </Link>
          </div>
        );
      });

    let path = character.thumbnail.path;
    let ext = character.thumbnail.extension;
    let fullImage = path + "." + ext;
    name = <h1> {character.name} </h1>;
    img = <img alt="Character" src={fullImage} width="175" height="175" />;

    if (character && character.description) {
      des = <p> {character.description} </p>;
    } else {
      des = <p> No description available </p>;
    }

    return (
      <div className="characterCard">

        <div className="characterInfo">
          <div>
            {name}
            {img}
          </div>
          <div>{des}</div>
        </div>

        <h3> Featured in:</h3>
        <div className="featuredComicList">{ul}</div>

      </div>
    );
  }
};

export default Character;

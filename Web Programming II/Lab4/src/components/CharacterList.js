import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import "../App.css";
import axios from "axios";
import SearchCharacters from "./SearchCharacters";

const md5 = require("blueimp-md5");
const publickey = "064af32e99a8f1a057b985bd73eac44f";
const privatekey = "68316e2e638896c37d0e725ee3daf8044d8d58a5";
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
let offset = null;
let baseUrl = null;
let url = null;

const CharacterList = (props) => {
  const [loading, setLoading] = useState(true);
  const [CharacterData, setCharacterData] = useState(undefined);
  const [searchData, setSearchData] = useState(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(false);
  let nextPage = null;
  let prevPage = null;
  let ul = null;
  let img = null;

  useEffect(() => {
    console.log("on load useeffect");
    offset = (parseInt(props.match.params.page) * 20).toString();
    baseUrl =
      "https://gateway.marvel.com:443/v1/public/characters?offset=" + offset;
    url = baseUrl + "&ts=" + ts + "&apikey=" + publickey + "&hash=" + hash;
    console.log(url);
    async function fetchData() {
      try {
        const { data } = await axios.get(url);
        console.log(data);
        setCharacterData(data);
        setLoading(false);
      } catch (e) {
        setError(true);
        console.log(e);
      }
    }
    fetchData();
  }, [props.match.params.page]);

  useEffect(() => {
    console.log("search useEffect fired");
    async function fetchData() {
      try {
        console.log(`in fetch searchTerm: ${searchTerm}`);
        baseUrl =
          "https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=" +
          searchTerm;
        url = baseUrl + "&ts=" + ts + "&apikey=" + publickey + "&hash=" + hash;
        const { data } = await axios.get(url);
        setSearchData(data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    if (searchTerm) {
      console.log("searchTerm is set");
      fetchData();
    }
  }, [searchTerm]);

  const searchValue = async (value) => {
    setSearchTerm(value);
  };

  const NextPage = () => {
    let pageNumber = parseInt(props.match.params.page);
    let nextPage = pageNumber + 1;
    return (
      <Link to={`/Characters/page/${nextPage}`}>
        {" "}
        <div className="nextPage"> Next Page </div>{" "}
      </Link>
    );
  };

  const PrevPage = () => {
    let pageNumber = parseInt(props.match.params.page);
    let prevPage = pageNumber - 1;
    return (
      <Link to={`/Characters/page/${prevPage}`}>
        <div className="prevPage">Previous Page</div>
      </Link>
    );
  };

  if (searchTerm && searchData) {
    ul =
      searchData.data.results &&
      searchData.data.results.map((character) => {
        let path = character.thumbnail.path;
        let ext = character.thumbnail.extension;
        let fullImage = path + "." + ext;
        img = <img className="characterImage" alt="Character" src={fullImage} width="175" height="175" />;

        return (
          <div key={character.id}>
            <Link to={`/characters/${character.id}`}>
			<div className="characterListCard">
              {img}
              <h3> {character.name}</h3>
			  </div>
            </Link>
          </div>
        );
      });
  } else if (CharacterData) {
    ul =
      CharacterData.data.results &&
      CharacterData.data.results.map((character) => {
        let path = character.thumbnail.path;
        let ext = character.thumbnail.extension;
        let fullImage = path + "." + ext;
        img = (
          <img
            className="characterImage"
            alt="Character"
            src={fullImage}
            width="175"
            height="175"
          />
        );
        return (
          <div key={character.id}>
            <Link to={`/characters/${character.id}`}>
              <div className="characterListCard">
                {img}
                <h3>{character.name}</h3>
              </div>
            </Link>
          </div>
        );
      });
  }

  if (error) {
    return <Redirect to="/ErrorPage" />;
  }

  if (loading) {
    return <h1> Loading... </h1>;
  } else {
    let totalPages = Math.floor(
      CharacterData.data.total / CharacterData.data.limit
    );
    if (
      CharacterData.data.count === 0 ||
      isNaN(parseInt(props.match.params.page))
    ) {
      return <Redirect to="/ErrorPage" />;
    }

    if (parseInt(props.match.params.page) !== 0) {
      prevPage = PrevPage();
    }

    if (parseInt(props.match.params.page) + 1 <= totalPages) {
      nextPage = NextPage();
    }

    return (
      <div className="App-body">
        <h1 className="listTitle">Marvel Characters</h1>
		<SearchCharacters searchValue={searchValue} />
        <div className="pageButtons">
          {prevPage}
          {nextPage}
        </div>
        <div className="characterItems">{ul}</div>
      </div>
    );
  }
};

export default CharacterList;

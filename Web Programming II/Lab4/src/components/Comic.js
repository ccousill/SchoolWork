import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../App.css';

import axios from 'axios';
const md5 = require('blueimp-md5');
const publickey = '064af32e99a8f1a057b985bd73eac44f';
const privatekey = '68316e2e638896c37d0e725ee3daf8044d8d58a5';
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
let id = null;
let baseUrl = null;
let url = null;
let des = null;


const Comic = (props) => {
	const [ loading, setLoading ] = useState(true);
	const [ ComicData, setComicData ] = useState(undefined);
	const [ hasError, setHasError ] = useState(false);
	let img = null;
	let title = null;
	let ul = null

	useEffect(() => {
		console.log('on load useeffect');
		id = props.match.params.id
		baseUrl = 'https://gateway.marvel.com:443/v1/public/comics?id='+id;
		url = baseUrl + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;

		async function fetchData() {
			try {
				const { data } = await axios.get(url);
				setComicData(data);
				setLoading(false);
			} catch (e) {
				console.log(e);
				setHasError(true);
				setLoading(false);
			}
		}
		fetchData();
	}, [props.match.params.id]);



	if(loading){
		return(<h1> loading... </h1>)
	}

	if(hasError){
			return ( <Redirect to ="/ErrorPage" />);
		}

	else{
		let comic = ComicData.data.results[0]
		console.log(comic)

		ul =
			comic.characters.items &&
			comic.characters.items.map((character) => {
				let id = character.resourceURI.substring(character.resourceURI.lastIndexOf('/') + 1)
				return (
					<ul key={id}>
						<Link to={`/characters/${id}`}>
						{character.name}
						<br />
						</Link>
					</ul>
					)

			});


		
		let path = comic.thumbnail.path
		let ext = comic.thumbnail.extension
		let fullImage = path + "." + ext
		title = <h1> {comic.title} </h1>
		img = <img alt = "comic" src = {fullImage} width="175" height="250" />

		if(comic && comic.description){
			des = <p> {comic.description} </p>
		}
		else{
			des = <p> N/A </p>
		}

		return (
		<div className ="App-body">
		{title} 
		<br />
		{img}
		<br />
		<h2> Description: </h2>
		{des}
		<br />
		<h3> Characters Featured in this comic:  </h3>
		{ul}
		</div>
		)


	}

};

export default Comic;

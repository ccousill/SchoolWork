import React, { useState, useEffect } from 'react';
 import { Redirect, Link } from 'react-router-dom';
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
let ul = null;


const Series = (props) => {
	const [ loading, setLoading ] = useState(true);
	const [ SeriesData, setSeriesData ] = useState(undefined);
	const [ hasError, setHasError ] = useState(false);
	let img = null;
	let title = null;

	useEffect(() => {
		console.log('on load useeffect');

		id = props.match.params.id
		baseUrl = 'https://gateway.marvel.com:443/v1/public/series?id='+id;
		url = baseUrl + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
		async function fetchData() {
			try {
				const { data } = await axios.get(url);
				setSeriesData(data);
				console.log(data)
				setLoading(false);
			} catch(e) {
				console.log(e)
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
		let series = SeriesData.data.results[0]

		ul =
			series.comics.items &&
			series.comics.items.map((series) => {
				let id = series.resourceURI.substring(series.resourceURI.lastIndexOf('/') + 1)
				return (
					<ul key={id}>
						<Link to={`/comics/${id}`}>
						{series.name}
						<br />
						</Link>
					</ul>
					)

			});
		
		let path = series.thumbnail.path
		let ext = series.thumbnail.extension
		let fullImage = path + "." + ext
		title = <h1> {series.title} </h1>
		img = <img alt = "series" src = {fullImage} width="215" height="250" />

		if(series && series.description){
			des = <p> {series.description} </p>
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
		<h3> Comics Featured: </h3>
		{ul}
		</div>
		)


	}










};

export default Series;

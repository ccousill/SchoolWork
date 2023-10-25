import React, { useState, useEffect } from 'react';
import { Link, Redirect} from 'react-router-dom';
import '../App.css';

import axios from 'axios';
import SearchSeries from './SearchSeries';

const md5 = require('blueimp-md5');
const publickey = '064af32e99a8f1a057b985bd73eac44f';
const privatekey = '68316e2e638896c37d0e725ee3daf8044d8d58a5';
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);

let offset = null;
let baseUrl = null;
let url = null;


const SeriesList = (props) => {
	const [ loading, setLoading ] = useState(true);
	const [ SeriesData, setSeriesData ] = useState(undefined);
	const [ searchData, setSearchData ] = useState(undefined);
	const [ searchTerm, setSearchTerm ] = useState('');
	const [ error, setError ] = useState(false)
	let nextPage = null;
	let prevPage = null;
	let ul = null;
	let img = null;

	useEffect(() => {
		console.log('on load useeffect');
		offset = (parseInt(props.match.params.page) * 20).toString()
		baseUrl = 'https://gateway.marvel.com:443/v1/public/series?offset='+offset;
		url = baseUrl + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
		
		async function fetchData() {
			try {
				const { data } = await axios.get(url);
				console.log(data)
				setSeriesData(data);	
				setLoading(false);

			} catch (e) {
				setError(true)
				console.log(e);
			}

		}
		fetchData();
	}, [props.match.params.page]);

	useEffect(
		() => {
			console.log('search useEffect fired');
			async function fetchData() {
				try {
					console.log(`in fetch searchTerm: ${searchTerm}`);
					baseUrl = 'https://gateway.marvel.com:443/v1/public/series?titleStartsWith='+searchTerm;
					url = baseUrl + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
					console.log(url)
					const { data } = await axios.get(url);
					setSearchData(data);
					setLoading(false);
				} catch (e) {
					console.log(e);
				}
			}
			if (searchTerm) {
				console.log ('searchTerm is set')
				fetchData();
			}
		},
		[ searchTerm ]
	);

	const searchValue = async (value) => {
		setSearchTerm(value);

	};

	const NextPage = () => {
		let pageNumber = parseInt(props.match.params.page)
		let nextPage = pageNumber + 1
		return(
			<Link to={`/series/page/${nextPage}`}>Next Page</Link>
		);
	};

	const PrevPage = () => {
		let pageNumber = parseInt(props.match.params.page)
		let prevPage = pageNumber - 1
		return(
			<Link to={`/series/page/${prevPage}`}>Previous Page</Link>
		);
	};

	if(searchTerm && searchData){
		ul =
			searchData.data.results &&
			searchData.data.results.map((series) => {
				let path = series.thumbnail.path
				let ext = series.thumbnail.extension
				let fullImage = path + "." + ext

				img = <img alt = "Series" src = {fullImage} width="215" height="250" />
				return (
					<ul key={series.id}>
						<Link to={`/series/${series.id}`}>
						{series.title}
						<br />
						{img}
						</Link>
					</ul>
					)

			});
	}

	else if(SeriesData){
		ul =
			SeriesData.data.results &&
			SeriesData.data.results.map((series) => {
				let path = series.thumbnail.path
				let ext = series.thumbnail.extension
				let fullImage = path + "." + ext

				img = <img alt = "Series" src = {fullImage} width="215" height="250" />
				return (
					<ul key={series.id}>
						<Link to={`/series/${series.id}`}>
						{series.title}
						<br />
						{img}
						</Link>
					</ul>
					)

			});
	
	}


	if(error){
		return( <Redirect to ="/ErrorPage" />)
	}

	if(loading){
		return (<h1> Loading... </h1>)
	}

	else{

		let totalPages = Math.floor(SeriesData.data.total / SeriesData.data.limit)
		if(SeriesData.data.count === 0 || (isNaN(parseInt(props.match.params.page)))){
			return( <Redirect to ="/ErrorPage" />)
		}

		if(parseInt(props.match.params.page) !== 0){
			prevPage = PrevPage();
		}

		if((parseInt(props.match.params.page) + 1) <= totalPages){
			nextPage = NextPage();
		}

	return (
		<div className ="App-body">
		<h1 className="listTitle">Marvel Series</h1>
		{prevPage}
		<br />
		{nextPage}
		<SearchSeries searchValue={searchValue} />
		{ul}
		</div>
			)

	}



};

export default SeriesList;

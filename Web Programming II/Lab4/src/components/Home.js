// import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';


const Home = () => {
	return (
		<div>

		<Link to='/characters/page/0'>
						List of Characters
		</Link>
		<br />
		<br />
		
		<Link to='/comics/page/0'>
						List of comics
		</Link>
		<br />
		<br />

		<Link to='/series/page/0'>
						List of series
		</Link>
		<br />
		<br />

			<p>
				This Single Page Application is a directory that displays Marvel characters, comics, and series using the Marvel API.
			</p>

		</div>
		
	);
};

export default Home;

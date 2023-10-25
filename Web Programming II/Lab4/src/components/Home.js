// import React, { useState, useEffect } from 'react';

import { Link } from "react-router-dom";
import "../App.css";

const Home = () => {
  return (
    <div className="homeDiv">
      <div className="homeLink">

        <Link to="/characters/page/0">
          <div className="linkToPage">Characters</div>
        </Link>

        <Link to="/comics/page/0">
          <div className="linkToPage">Comics</div>
        </Link>

        <Link to="/series/page/0">
          <div className="linkToPage">Series</div>
        </Link>
      </div>
      <hr className="line" />
      <div className="homeDesc">
        <p>
          This Single Page Application is a directory that displays Marvel
          characters, comics, and series using the Marvel API. Click on one of the buttons above to travel to a directory of your choice.
        </p>
      </div>
    </div>
  );
};

export default Home;

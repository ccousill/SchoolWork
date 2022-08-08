import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../firebase/Auth';
import '../App.css';
import SearchBox from "./SearchBox";

function Nav() {
  const {currentUser} = useContext(AuthContext);
  let signup = null;
  let signin = null;
  let kitchen = null;
  let createRecipe = null;
  let account = null;
  if(!currentUser){
    signup = <NavLink className="navlink" to="/signup">Sign Up</NavLink>;
    signin = <NavLink className="navlink" to="/signin">Sign In</NavLink>;
  } else {
    kitchen = <NavLink className="navlink" to="/myKitchen">My Kitchen</NavLink>;
    createRecipe = <NavLink className="navlink" to="/createRecipe">Create Recipe</NavLink>;
    account = <NavLink className="navlink" to="/account">Account</NavLink>;
  }
  return (
    <nav>
      <div className="searchBarPadding">
      <SearchBox ></SearchBox>
      </div>
    <div>
      <NavLink className="navlink" to="/">
        Home
      </NavLink>
      <NavLink className="navlink" to="/recipes">
        Recipes
      </NavLink>
      {createRecipe}
      {kitchen}
      {account}
      {signup}
      {signin}
  
    </div>
    </nav>
  );
}

export default Nav;

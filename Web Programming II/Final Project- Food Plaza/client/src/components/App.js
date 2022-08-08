import React from 'react';
import '../App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Account from './Account';
import Home from './Home';
import CreateRecipe from './CreateRecipe.js'
import MyKitchen from './MyKitchen.js'
import Nav from './Nav.js';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Recipes from './Recipes';
import Recipe from './Recipe';
import Edit from './Edit';
import { AuthProvider } from '../firebase/Auth';
import PrivateRoute from './PrivateRoute';
import Search from "./Search";
function App() {
  return (
    <AuthProvider>
          <Router>
            <div className='childId'>
              <header className="App-header">
                <h1 className="App-title"> Food Plaza </h1>
                <Nav/>
              </header>
              <Route exact path="/" component={Home} />
              <PrivateRoute exact path="/createRecipe" component= {CreateRecipe} />
              <PrivateRoute exact path="/myKitchen" component= {MyKitchen} />
              <PrivateRoute path="/account" component={Account} />
              <Route path="/signin" component={SignIn} />
              <Route path="/signup" component={SignUp} />
              <Route path="/recipes" component={Recipes} />
              <Route path="/recipe/:id" component={Recipe} />
              <Route path="/edit/:id" component={Edit} />
              <Route path="/search" component={Search} />
            </div>
          </Router>
      </AuthProvider>
  );
}

export default App;

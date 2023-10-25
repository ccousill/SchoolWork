import "./App.css";
import Home from "./components/Home";
import PokemonList from "./components/PokemonList";
import Pokemon from "./components/Pokemon";
import Trainers from "./components/Trainers";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <p> Catch Pokemon! </p>
          <div className="navLinks">
            <Link className="App-link" to="/">
              Home
            </Link>
            <Link className="App-link" to="/pokemon/page/0">
              Pokemon List
            </Link>
            <Link className="App-link" to="/trainers">
              Trainers
            </Link>
          </div>
        </header>

        <br />
        <br />
        <div className="App-body">
          <Route exact path="/" component={Home} />
          <Route exact path="/pokemon/page/:page" component={PokemonList} />
          <Route exact path="/pokemon/:id" component={Pokemon} />
          <Route exact path="/trainers" component={Trainers} />
        </div>
      </div>
    </Router>
  );
}

export default App;

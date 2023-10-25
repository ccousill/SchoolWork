import './App.css';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Home from './components/Home';
import Character from './components/Character';
import CharacterList from './components/CharacterList';
import Comic from './components/Comic';
import ComicList from './components/ComicList';
import Series from './components/Series';
import SeriesList from './components/SeriesList';
import ErrorPage from './components/ErrorPage';

function App() {
  return (
    <Router>
    <div className="App">
      <header className="App-header">
        <h1> Marvel API page </h1>
        <Link className="App-link" to ='/'><div className="homeLinkDiv"> Home </div> </Link>
      </header>

      <br />
      <br />
        <div className='App-body'>
          
          <Route exact path='/' component={Home} />
          <Route exact path='/characters/page/:page' component={CharacterList} />
          <Route exact path='/characters/:id' component={Character} />
          <Route exact path='/comics/page/:page' component={ComicList} />
          <Route exact path='/comics/:id' component={Comic} />
          <Route exact path='/series/page/:page' component={SeriesList} />
          <Route exact path='/series/:id' component={Series} />
          <Route exact path='/ErrorPage' component={ErrorPage} />




      
        </div>

    </div>
    </Router>
  );
}

export default App;

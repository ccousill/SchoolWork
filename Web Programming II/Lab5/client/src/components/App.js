import React from 'react';
import './App.css';
import { NavLink, BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import NewPost from './NewPost'

import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider
} from '@apollo/client';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        unsplashImages: {
          // Don't cache separate results based on
          // any of this field's arguments.
          keyArgs: false,
          // Concatenate the incoming list items with
          // the existing list items.
          merge(existing = [], incoming) {
            if(existing.length !== 0){
            if(incoming[0].__ref === existing[0].__ref){
              return incoming
            }
            }

            return [...existing, ...incoming];
          },
        }
      }
    }
  }
})


const client = new ApolloClient({
  cache: cache,
  link: new HttpLink({
    uri: 'http://localhost:4000'
  })
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <header className="App-header">
            <h1 className="App-title">
              Binterest
            </h1>
            <nav>
              <NavLink className="navlink" to="/">
                Home
              </NavLink>
              <NavLink className="navlink" to="/my-bin">
                My Bin
              </NavLink>

              <NavLink className="navlink" to="/my-posts">
                My Posts
              </NavLink>

              {/*<NavLink className="navlink" to="/new-post">
                New Post
              </NavLink>*/}

            </nav>
          </header>
          <Route exact path='/' component={Home} />
          <Route exact path='/my-bin' component={Home} />
          <Route exact path='/my-posts' component={Home} />
          <Route exact path='/new-post' component={NewPost} />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;

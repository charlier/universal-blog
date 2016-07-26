import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import App from './containers/App';
import Home from './containers/Home';
import About from './containers/About';
import Post from './containers/Post';
import NoMatch from './containers/NoMatch';

export default (
  <Route path='/' component={App}>
  <IndexRoute component={Home} />
  <Route path='/about' component={About} />
  <Route path='/post/:id' component={Post} />
  <Route status={404} path="*" component={NoMatch} />
  <Redirect from="/*/" to="/*" />
  </Route>
);

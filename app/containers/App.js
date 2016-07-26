import React, { Component } from 'react';
import { Link } from 'react-router';
import {IndexLink } from 'react-router';
import Helmet from 'react-helmet';
import './scss/App.scss';
import config from '../config';

class App extends Component {

  render() {
    return (
      <div>
      <Helmet
      title='loading...'
      titleTemplate='charlie.im - %s'
      meta={[
        {'char-set': 'utf-8'},
        {'http-equiv': 'x-ua-compatible', 'content': 'ie=edge'},
        {'name': 'viewport', 'content': 'width=device-width, initial-scale=1'},
        {'name': 'og:type', 'content': 'website'},
        {'name': 'og:site_name', 'content': 'charlie.im'},
        {'name': 'twitter:creator', 'content': '@charlierogers'},
        {'name': 'twitter:site', 'content': '@charlierogers'}
      ]}
      link={[
        {'rel': 'shortcut icon', 'href': `${config.staticHost}/favicon.ico`, 'type': 'image/x-icon'},
        config.env ? {'rel': 'stylesheet', 'href': `${config.staticHost}/style.min.css`} : {}
      ]}
      />
      <nav>
      <ul>
      <li><IndexLink to="/" activeClassName='active'>Home</IndexLink></li>
      <li><Link to='/about' activeClassName='active'>About</Link></li>
      <li><Link to='/'>Resum&eacute;</Link></li>
      </ul>
      </nav>
      <section id="content">
      {this.props.children}
      </section>
      <footer id="footer">
      Site scripting by Charles A Rogers. Copyright &copy; 2002-16.<br />
      Any resemblance between users and real persons living or dead is purely coincidental.<br />
      Do not fold or bend.
      </footer>
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.object
};

export default App;

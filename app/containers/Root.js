import React, { Component } from 'react';
import config from '../config';

class Root extends Component {

  renderInitialState() {
    if (this.props.initialState) {
      const innerHtml = `window.__INITIAL_STATE__ = ${JSON.stringify(this.props.initialState)}`;
      return <script dangerouslySetInnerHTML={{__html: innerHtml}} />;
    }
  }

  renderEnvironment() {
    // TODO: make me use config
    const innerHtml = `window.__ENVIRONMENT__ = '${__ENVIRONMENT__}'`;
    return <script dangerouslySetInnerHTML={{__html: innerHtml}} />
  }

  render() {
    const head = this.props.head;

    return (
      <html lang='en-GB'>
        <head>
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
        </head>
        <body>
          <div id='root' dangerouslySetInnerHTML={{__html: this.props.content}} />
          {this.renderEnvironment()}
          {this.renderInitialState()}
          {head.script.toComponent()}
          <script src={!config.env ? '/app.js' : config.staticHost + '/app.min.js'}></script>
        </body>
      </html>
    );
  }
}

Root.propTypes = {
	initialState: React.PropTypes.object,
  content: React.PropTypes.string,
	head: React.PropTypes.string
};

export default Root;

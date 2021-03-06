import { h } from 'preact';

import PureComponent from '../utils/pureComponent';
import App from '../components/app';

export default class Github extends PureComponent {
  static getInitialProps({ params: { user } }) {
    return fetch(`https://api.github.com/users/${user}/repos`)
      .then((res) => res.json())
      .then((items) => ({ items }));
  }

  render({ items }) {
    return (
      <App>
        <h1>Github</h1>
        {items.map((item) => <Item {...item} />)}
      </App>
    );
  }
}

const Item = ({ name, description }) => (
  <div>
    <h2>{name}</h2>
    <p>{description}</p>
  </div>
);

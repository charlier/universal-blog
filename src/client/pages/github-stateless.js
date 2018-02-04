import { h } from 'preact';

import App from '../components/app';

const Item = ({ name, description }) => (
  <div>
    <h2>{name}</h2>
    <p>{description}</p>
  </div>
);

const Github = ({ items }) => (
  <App>
    {items.map((item) => <Item {...item} />)}
  </App>
);

Github.getInitialProps = async ({ params: { user } }) =>
  fetch(`https://api.github.com/users/${user}/repos`)
    .then((res) => res.json())
    .then((items) => ({ items }));

export default Github;

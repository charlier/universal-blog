import { h } from 'preact';
import Helmet from 'preact-helmet';

import App from '../components/app';

const Home = () => (
  <App>
    <Helmet title="My Title" />
    <h1>charlie.im</h1>
    <p>
      Hi! I’m Charlie Rogers, a Full-Stack Developer with experience in creating some of the most loved websites in the <abbr title="United Kingdom">UK</abbr>.<br />
      I’m currently helping fix <a href="http://www.bbc.co.uk/iplayer">BBC iPlayer</a>.
    </p>
    <p>
      To get in touch, send me an email or find me on
      <a href="https://www.linkedin.com/in/charliero" target="_blank" rel="noopener noreferrer">LinkedIn</a>,
      <a href="https://github.com/charlier" target="_blank" rel="noopener noreferrer">GitHub</a>,
      or <a href="https://twitter.com/charlierogers" target="_blank" rel="noopener noreferrer">Twitter</a>.
    </p>
  </App>
);

export default Home;

import { h } from 'preact';
import Helmet from 'preact-helmet';

import Link from '../link';

const App = ({ children }) => (
  <div>
    <Helmet
      htmlAttributes={
        { name: 'lang', content: 'en-GB' }
      }
      title='Title not set :('
      titleTemplate='charlie.im - %s'
      meta={[
        { 'char-set': 'utf-8' },
        { 'http-equiv': 'x-ua-compatible', content: 'ie=edge' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'og:type', content: 'website' },
        { name: 'og:site_name', content: 'charlie.im' },
        { name: 'twitter:creator', content: '@charlierogers' },
        { name: 'twitter:site', content: '@charlierogers' }
      ]}
    />
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/wiki/Charles">Wikipedia: Charles</Link>
        </li>
        <li>
          <Link href="/github/charlier">Github: charlier</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
      </ul>
    </nav>
    <section>{children}</section>
    <footer>
      Site scripting by Charles A Rogers. Copyright © 2002-18.<br />
      Any resemblance between users and real persons living or dead is purely coincidental.<br />
      Do not fold or bend.
    </footer>
  </div>
);

export default App;

import { h } from 'preact';
import 'isomorphic-unfetch';

import Link from '../link';

export default ({ children }) => (
  <div>
    <h1>Header</h1>
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/wiki/Banana">Wiki: Banana</Link>
      </li>
      <li>
        <Link href="/github/charlier">Github: charlier</Link>
      </li>
      <li>
        <Link href="/about">About</Link>
      </li>
    </ul>
    <div>{children}</div>
  </div>
);

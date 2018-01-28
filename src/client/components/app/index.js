import { h } from 'preact';

import Link from '../link';

export default ({ children }) => (
  <div>
    <h1>Header</h1>
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/article/Banana">Article: Banana</Link>
      </li>
      <li>
        <Link href="/article/Apple">Article: Apple</Link>
      </li>
      <li>
        <Link href="/about">About</Link>
      </li>
    </ul>
    <div>{children}</div>
  </div>
);

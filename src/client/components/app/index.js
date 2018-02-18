import { h } from 'preact';

import Link from '../link';

export default ({ children }) => (
  <div>
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

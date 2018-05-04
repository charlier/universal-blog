import { render, h } from 'preact';
import createHistory from 'history/createBrowserHistory';

import Provider from './utils/provider';
import routes from './routes';
import createRouter from './router';

const root = document.getElementById('root');
window.webpackManifest = JSON.parse(root.getAttribute('data-manifest'));
root.removeAttribute('data-manifest');
const history = createHistory();
const router = createRouter(routes);
history.listen(() => init());

const init = () =>
  router.match(history.location.pathname)
    .then(({ Page, props }) =>
      render(
        <Provider {...{ history }}>
          <Page {...{ ...props }} />
        </Provider>,
        root,
        root.lastChild
      )
    );

init();

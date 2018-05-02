import { render, h } from 'preact';
import createHistory from 'history/createBrowserHistory';

import PureComponent from './utils/pureComponent';
import routes from './routes';
import createRouter from './router';

const root = document.getElementById('root');
window.webpackManifest = JSON.parse(root.getAttribute('data-manifest'));
const history = createHistory();
const router = createRouter(routes);
history.listen(() => init());

const init = () =>
  router.match(history.location.pathname).then(({ Page, props }) => {
    render(
      <WithContext>
        <Page {...props} history={history} />
      </WithContext>,
      root,
      root.lastChild
    );
    return root;
  });

class WithContext extends PureComponent {
  getChildContext() {
    return { history };
  }
  render({ children }) {
    return children[0];
  }
}

init();

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
  router.match(history.location.pathname)
    .then(({ Page, props }) =>
      render(
        <WithContext {...{ history }}>
          <Page {...{ ...props }} />
        </WithContext>,
        root,
        root.lastChild
      )
    );

class WithContext extends PureComponent {
  getChildContext() {
    const { children, ...context } = this.props;
    return context;
  }
  render({ children }) {
    return (children && children[0] || null);
  }
}

init();

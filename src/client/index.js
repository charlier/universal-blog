import { render, Component, h } from 'preact';
import createHistory from 'history/createBrowserHistory';
import routes from './routes';
import createRouter from './router';

const root = document.getElementById('root');
const history = (window.h = createHistory());
const router = createRouter(routes);
window.webpackManifest = JSON.parse(root.getAttribute('data-manifest'));
root.removeAttribute('data-manifest');
history.listen(() => init());

const init = () => {
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
};

class WithContext extends Component {
  getChildContext() {
    return { history };
  }
  render({ children }) {
    return children[0];
  }
}

init();

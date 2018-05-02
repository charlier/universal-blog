import render from 'preact-render-to-string';

import routes from '../client/routes';
import createRouter from '../client/router';
import html from './html';

const router = createRouter(routes);
const request = ({ url }, res) =>
  router
    .match(url)
    .then(({ chunkName, Page, props }) =>
      res.status(200).send(
        render(html({
          chunkName,
          Page,
          props
        }))
      )
    )
    .catch((e) => res.status(404).send(e.message));

export default request;

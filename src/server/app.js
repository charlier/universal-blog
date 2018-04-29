import fs from 'fs';
import path from 'path';
import { h } from 'preact';
import render from 'preact-render-to-string';
import Helmet from 'preact-helmet';

import routes from '../client/routes';
import createRouter from '../client/router';

const readJSON = (p) => JSON.parse(fs.readFileSync(path.resolve(p)).toString());
const assetsManifest = readJSON('dist/client/assets-manifest.json');
const chunkManifest = readJSON('dist/client/chunk-manifest.json');
const router = createRouter(routes);

const tpl = ({ chunkName, Page, props }) => {
  const scriptsToLoad = [assetsManifest['index'].js, assetsManifest[chunkName].js];
  const script = scriptsToLoad.map((src) => ({ src, type: 'text/javascript' }));
  render(<Helmet script={script} />);
  const head = Helmet.rewind();
  const attrs = head.htmlAttributes.toComponent();
  return (
    <html {...attrs}>
      <head>
        {head.title.toComponent()}
        {head.meta.toComponent()}
      </head>
      <body>
        <div id="root"
          data-manifest={JSON.stringify(chunkManifest)}
          data-props={JSON.stringify(props)}>
          <Page {...props} />
        </div>
        {head.script.toComponent()}
      </body>
    </html>
  );
};

const request = ({ url }, res) =>
  router
    .match(url)
    .then(({ chunkName, Page, props }) =>
      res.status(200).send(
        render(tpl({
          chunkName,
          Page,
          props
        }))
      )
    )
    .catch((e) => res.status(404).send(e.message));

export default request;

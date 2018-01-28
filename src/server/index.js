import express from 'express';
import fs from 'fs';
import path from 'path';
import { h } from 'preact';
import render from 'preact-render-to-string';

import routes from '../client/routes';
import createRouter from '../client/router';

const server = express();
const assets = readJSON('dist/client/assets-manifest.json');
const chunkManifest = readJSON('dist/client/chunk-manifest.json');

const tpl = ({ pageChunkName, initialProps, html = '' }) => {
  const scriptsToLoad = [assets['index'].js, assets[pageChunkName].js];
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
  <meta charset="utf-8"/>
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Test</title>
  ${scriptsToLoad
    .map((s) => `<link rel="preload" href="${s}" as="script">`)
    .join('\n')}
  </head>
  <body>
    <div id="root">${html}</div>
    <script type="text/javascript">
    window.webpackManifest = ${JSON.stringify(chunkManifest)}
    window.INITIAL_PROPS = ${JSON.stringify(initialProps)}
    </script>
    ${scriptsToLoad
    .map((s) => `<script type="text/javascript" src="${s}"></script>`)
    .join('\n')}
  </body>
</html>`;
};

server.use(express.static('./dist/client'));

const router = createRouter(routes);

server.get('*', ({ url }, res) => {
  router
    .match(url)
    .then(({ chunkName, Page, props, initialProps }) => {
      res.status(200).send(
        tpl({
          pageChunkName: chunkName,
          initialProps,
          html: render(<Page {...props} />)
        })
      );
    })
    .catch((e) => res.status(404).send(e.message));
});

const port = process.env.PORT || 3000;
server.listen(port);

function readJSON(p) {
  return JSON.parse(fs.readFileSync(path.resolve(p)).toString());
}

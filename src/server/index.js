import express from 'express';
import fs from 'fs';
import path from 'path';
import { h } from 'preact';
import render from 'preact-render-to-string';

import routes from '../client/routes';
import createRouter from '../client/router';

const readJSON = (p) => JSON.parse(fs.readFileSync(path.resolve(p)).toString());
const assetsManifest = readJSON('dist/client/assets-manifest.json');
const chunkManifest = readJSON('dist/client/chunk-manifest.json');

const server = express();
server.use(express.static('./dist/client'));
const port = process.env.PORT || 3000;
server.listen(port);

const router = createRouter(routes);

const tpl = ({ pageChunkName, initialProps, html = '' }) => {
  const scriptsToLoad = [assetsManifest['index'].js, assetsManifest[pageChunkName].js];
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
  <meta charset="utf-8" />
  <meta http-equiv="x-ua-compatible" content="ie=edge" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Title</title>
  ${scriptsToLoad
    .map((s) => `<link rel="preload" href="${s}" as="script">`)
    .join('\n')}
  </head>
  <body>
  <div id="root" 
    data-manifest = '${JSON.stringify(chunkManifest)}'
    data-props='${JSON.stringify(initialProps)}'>${html}</div>
    ${scriptsToLoad
    .map((s) => `<script type="text/javascript" src="${s}"></script>`)
    .join('\n')}
  </body>
</html>`;
};

server.get('*', ({ url }, res) =>
  router
    .match(url)
    .then(({ chunkName, Page, props, initialProps }) =>
      res.status(200).send(
        tpl({
          pageChunkName: chunkName,
          initialProps,
          html: render(<Page {...props} />)
        })
      )
    )
    .catch((e) => res.status(404).send(e.message))
);

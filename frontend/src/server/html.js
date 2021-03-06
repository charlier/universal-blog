import { h } from 'preact';
import Helmet from 'preact-helmet';
import fs from 'fs';
import path from 'path';
import render from 'preact-render-to-string';

const readJSON = (p) => JSON.parse(fs.readFileSync(path.resolve(p)).toString());
const assetsManifest = readJSON('dist/client/assets-manifest.json');
const chunkManifest = readJSON('dist/client/chunk-manifest.json');

const html = ({ chunkName, Page, props }) => {
  const scriptsToLoad = [assetsManifest['index'].js, assetsManifest[chunkName].js];
  const script = scriptsToLoad.map((src) => ({ src, type: 'text/javascript' }));
  render(<Helmet {...{ script }} />);
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

export default html;

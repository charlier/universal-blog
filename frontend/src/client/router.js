import ptr from 'path-to-regexp';
import 'isomorphic-unfetch';

const Router = (routes) => {
  const parsedRoutes = routes.map((route) => {
    const keys = [];
    const regex = ptr(route.path, keys);
    return {
      ...route,
      keys,
      regex
    };
  });

  return {
    match(url) {
      for (const route of parsedRoutes) {
        const match = route.regex.exec(url);
        if (match) {
          const [url, ...values] = match;
          const params = route.keys.reduce((memo, key, index) => {
            memo[key.name] = values[index];
            return memo;
          }, {});

          return route.page().then((matched) => {
            let initialProps = null;
            if (typeof document !== 'undefined' && document.getElementById('root').getAttribute('data-props')) {
              const root = document.getElementById('root');
              const props = JSON.parse(root.getAttribute('data-props'));
              root.removeAttribute('data-props');
              initialProps = Promise.resolve(props);
            } else if (matched.default && matched.default.getInitialProps) {
              initialProps = matched.default.getInitialProps({ params });
            } else {
              initialProps = Promise.resolve({});
            }
            return initialProps.then((props) => ({
              chunkName: route.chunkName,
              Page: matched.default,
              props: {
                path: route.path,
                url,
                params,
                ...props
              }
            }));
          });
        }
      }
      return Promise.reject(new Error('No route matched'));
    }
  };
};

export default Router;

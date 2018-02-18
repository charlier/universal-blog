import ptr from 'path-to-regexp';
import 'isomorphic-unfetch';

export default (routes) => {
  const parsedRoutes = routes.map((r) => {
    const keys = [];
    const re = ptr(r.path, keys);
    return {
      ...r,
      keys,
      re
    };
  });

  return {
    match(url) {
      for (const route of parsedRoutes) {
        const match = route.re.exec(url);
        if (match) {
          const [url, ...values] = match;
          const params = route.keys.reduce((memo, key, index) => {
            memo[key.name] = values[index];
            return memo;
          }, {});

          return route.page().then((m) => {
            let initialProps = null;
            if (typeof window !== 'undefined' && window.INITIAL_PROPS) {
              initialProps = Promise.resolve(window.INITIAL_PROPS);
              window.INITIAL_PROPS = undefined;
            } else if (m.default && m.default.getInitialProps) {
              initialProps = m.default.getInitialProps({ params });
            } else {
              initialProps = Promise.resolve({});
            }
            return initialProps.then((props) => ({
              chunkName: route.chunkName,
              Page: m.default,
              props: {
                path: route.path,
                url,
                params,
                ...props
              },
              initialProps: props
            }));
          });
        }
      }
      return Promise.reject(new Error('No route matched'));
    }
  };
};

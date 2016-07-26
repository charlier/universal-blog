import React from 'react';
import ReactDOM from 'react-dom';
import { renderToStaticMarkup } from 'react-dom/server';
import { Router, match, RouterContext, browserHistory } from 'react-router';
import Helmet from 'react-helmet';
import routes from './Routes';
import { Provider } from 'react-redux';
import Root from './containers/Root';
import configureStore from './configureStore';

const isClient = typeof document !== 'undefined';

if (isClient) {
	const store = configureStore(window.__INITIAL_STATE__);

	ReactDOM.render(
		<Provider store={store}>
			<Router history={browserHistory}>{routes}</Router>
		</Provider>,
		document.getElementById('root')
	);
}

function renderComponentWithRoot(Component, componentProps, store) {
	const componentHtml = renderToStaticMarkup(
		<Provider store={store}> 
			<Component {...componentProps} />
		</Provider>
	);

	const head = Helmet.rewind();
	const initialState = store.getState();

	return `<!doctype html>\n${renderToStaticMarkup(
    <Root content={componentHtml} initialState={initialState} head={head} />
)}`;
}

function handleError(res, error) {
	res.status(500).send(error.message);
}

function handleRedirect(res, redirectLocation) {
	res.redirect(302, redirectLocation.pathname + redirectLocation.search);
}

function handleRoute(res, renderProps) {
	const store = configureStore();

	const readyOnAllActions = renderProps.components
		.filter((component) => component.readyOnActions)
		.map((component) => component.readyOnActions(store.dispatch, renderProps.params));

	Promise.all(readyOnAllActions)
		.then(() => {
			const wholeHtml = renderComponentWithRoot(RouterContext, renderProps, store);
                        const isNotFound = renderProps.routes.filter((route) => {
                            return route.status === 404;
                        }).length > 0;
			res.status(isNotFound ? 404 : 200).send(wholeHtml);
		});
}

function serverMiddleware(req, res) {
	match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
		if (error) {
			handleError(error);
		} else if (redirectLocation) {
			handleRedirect(res, redirectLocation);
		} else {
			handleRoute(res, renderProps);
		}
	});
}

export default serverMiddleware;

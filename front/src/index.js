import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router';
import LoginPage from './pages/LoginPage';
import './scss/style.scss';
import { history, store } from './store/store';
import { FrontPath } from './util/FrontPath';

/*
Sentry.init({
	dsn: 'https://b37b36623d594a29880acb2d228702ea@sentry.io/1773712',
	attachStacktrace: true,
	integrations: integrations => {
		return integrations.filter(integration => integration.name !== 'Breadcrumbs');
	},
	release: "A",
	environment: "TESTE",
});
*/

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<div>
				Ola
				<Route path={FrontPath.LOGIN} render={() => <LoginPage />} />
			</div>
		</Router>
	</Provider>,
	document.getElementById('root')
);

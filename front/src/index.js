import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ForgotPasswordSuccessPage from './pages/ForgotPasswordSuccessPage';
import LoginPage from './pages/LoginPage';
import NewPasswordPage from './pages/NewPasswordPage';
import NewPasswordSuccessPage from './pages/NewPasswordSuccessPage';
import Page404 from './pages/Page404';
import RegisterConfirmPage from './pages/RegisterConfirmPage';
import RegisterPage from './pages/RegisterPage';
import RegisterSuccessPage from './pages/RegisterSuccessPage';
import './scss/style.scss';
import { history, store } from './store/store';
import Logger from './util/Logger';
import { FrontPath } from './util/Paths';

Logger.init();
ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<React.Fragment>
				<Switch>
					<Route exact path={FrontPath.ROOT} render={() => <LoginPage />} />
					<Route exact path={FrontPath.LOGIN} render={() => <LoginPage />} />
					<Route path={FrontPath.FORGOT_PASSWORD} render={() => <ForgotPasswordPage />} />
					<Route path={FrontPath.FORGOT_PASSWORD_SUCCESS} render={() => <ForgotPasswordSuccessPage />} />
					<Route path={FrontPath.NEW_PASSWORD} render={() => <NewPasswordPage />} />
					<Route path={FrontPath.NEW_PASSWORD_SUCCESS} render={() => <NewPasswordSuccessPage />} />
					<Route path={FrontPath.REGISTER} render={() => <RegisterPage />} />
					<Route path={FrontPath.REGISTER_SUCCESS} render={() => <RegisterSuccessPage />} />
					<Route path={FrontPath.REGISTER_CONFIRM} render={() => <RegisterConfirmPage />} />
					<Route render={() => <Page404 />} />
				</Switch>
			</React.Fragment>
		</Router>
	</Provider>,
	document.getElementById('root')
);

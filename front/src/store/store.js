import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import rootEpic from './epics';
import createRootReducer from './reducers';

let contextPath = '';
if (process.env.CONTEXT) {
	contextPath = `/${process.env.CONTEXT}`;
}

const history = createBrowserHistory(contextPath === '' ? {} : { basename: contextPath });
const reducer = createRootReducer(history);
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const epicMiddleware = createEpicMiddleware();
const crashReporter = () => next => action => {
	// eslint-disable-next-line no-unused-vars
	const result = next(action);
};

// eslint-disable-next-line no-unused-vars
const localStorageMiddleware = ({ getState }) => {
	return next => action => {
		const result = next(action);
		// eslint-disable-next-line no-unused-vars
		const state = getState();
		return result;
	};
};
const store = createStore(reducer, composeEnhancer(applyMiddleware(routerMiddleware(history), createLogger({ collapsed: true }), epicMiddleware, crashReporter, localStorageMiddleware)));

epicMiddleware.run(rootEpic);

export { store, history };

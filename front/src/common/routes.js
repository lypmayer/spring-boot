import React, { Props } from 'react';
import TaskTableView from '../../view/TaskTableView';
import TaskForm from '../../view/TaskForm';
import { Router, Route, Redirect, hashHistory} from 'react-router'

export default props => (
    <Router history={hashHistory}>
        <Route path='/list' component={TaskTableView} />
        <Route path='/register' component={TaskForm} />
        <Route path='/edit/:id' component={TaskForm} />
        <Redirect from='*' to='/list' />
    </Router>
)
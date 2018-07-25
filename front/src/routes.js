import React, { Props } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    withRouter 
} from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import TaskTableView from '../view/TaskTableView';
import TaskForm from '../view/TaskForm';

export default props => (
    <BrowserRouter>
        <Router >
            <div>
                <Route exact path="/" component={TaskTableView}/>
                <Route path="/list" component={TaskTableView} />
                <Route path="/register" component={TaskForm} />    
            </div>
        </Router>
    </BrowserRouter>    
)
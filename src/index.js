import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { App, Home, Login, Register, NotFound } from 'containers';

const rootElement = document.getElementById('root');
ReactDOM.render(
    <Router>
        <div>
            <Route path="/" component={App}/>
            <div>
                <Switch>
                    <Route path="/home" component={Home}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    {/* <Route path="*" component={NotFound}/> */}
                </Switch>
            </div>
        </div>
    </Router>
    , rootElement
);
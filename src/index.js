import React from 'react';
import ReactDOM from 'react-dom';

// Router
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// Container Components
import { App, Home, Login, Register, Wall } from 'containers';
// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from 'reducers';
import thunk from 'redux-thunk';

// store 어플리케이션의 현재상태를 지니고 있음 리덕스를 사용하는 app은 단 하나의 스토어가 있어야함.
const store = createStore(reducer, applyMiddleware(thunk), 
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const rootElement = document.getElementById('root');
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div> 
                <Route path="/" component={App}/>
                <Route path="/home" component={Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/wall/:username" component={Wall}/>
            </div>
        </BrowserRouter>
    </Provider>
    , rootElement
);
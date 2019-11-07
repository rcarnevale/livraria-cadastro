import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';

import {BrowserRouter, Switch, Route} from 'react-router-dom';

import App from './App';
import Sobre from './Sobre';
import Livros from './Livros';
import Autores from './Autores';
import NotFound from './NotFound';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={App} />
            <Route path='/autores' component={Autores} />
            <Route path='/livros' component={Livros} />
            <Route path='/sobre' component={Sobre} />
            <Route component={NotFound}></Route>
        </Switch>
    </BrowserRouter>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import App from './App';
import TicTacToe from './components/TicTacToe';
import './index.css';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
    </Route>
    <Route path="tictactoe" component={TicTacToe} className="TicTacToe-background"/>
  </Router>,
  document.getElementById('root')
);

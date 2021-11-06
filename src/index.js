import React from 'react';
import ReactDOM from 'react-dom';
import App from './Component/App/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';
import { HashRouter as Router } from 'react-router-dom';


ReactDOM.render(
  <Router>
  <App/>
  </Router>,
  document.getElementById('root')
);



// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <div className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//     <h2>Welcome to React</h2>
//         </div>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

// export default App;
// 
// 
// 
require('styles/jf.scss');
require('styles/base.scss');
import 'core-js/fn/object/assign';
import React from 'react';
import {
  render
} from 'react-dom';
import {
  BrowserRouter as Router,
  hashHistory,
  Route
} from 'react-router-dom'
import {
  browserHistory
} from 'react-router';
import R_det from './r_det';
import Searchhead from './containers/search/Redux_Searchhead';


// import App from './containers/App'

import reducer from '../reducers/search'

import {
  createStore,
  applyMiddleware
} from 'redux'

import {
  Provider
} from 'react-redux'
import thunk from 'redux-thunk'

import {
  createLogger
} from 'redux-logger'

const middleware = [thunk]
if (process.env.NODE_ENV !== 'production') {
  // middleware.push(createLogger())
  middleware

}
const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)
const R_Searchhead = () => (
  <Router history={browserHistory}>
        <div>
  <Route exact  path="/redux_search.html" component={Searchhead} />
     <Route path="/redux_search.html/R_det/:id" component={R_det}/>
      </div>
    </Router>
);

render(
  <Provider store={store}>
  <R_Searchhead/>
  </Provider>,
  document.getElementById('js-search-box')
)
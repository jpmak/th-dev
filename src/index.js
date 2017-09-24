import './styles/base.scss';
import './styles/jf.scss';
import 'core-js/fn/object/assign';

import React from 'react';
import {
	render
} from 'react-dom';
import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom'

import App from './containers/App';
import Detail from './containers/Detail';
import Searchhead from './containers/Searchhead';
import List from './containers/List';
import Home from './containers/Home';
import Login from './containers/Login';




import reducer from './reducers';

import {
	createStore,
	applyMiddleware
} from 'redux'

import {
	Provider
} from 'react-redux'
import thunk from 'redux-thunk'

// import {
// 	createLogger
// } from 'redux-logger'
const middleware = [thunk]
	// if (process.env.NODE_ENV !== 'production') {
	// 	// middleware.push(createLogger())
	// 	middleware

// }
const store = createStore(
	reducer,
	applyMiddleware(...middleware)
)


const Jf = () => (
	// <Route path='/Exchange-index.html/login(/:router)' component={Login} />
	<Router>
	<div>
	<Route exact path="/Exchange-index.html" component={App} />
	<Route path='/Exchange-index.html/login/:router?' component={Login} />
	
	 <Route path="/Exchange-index.html/product/:id?" component={Detail}/>

	 <Route path="/Exchange-index.html/search/:keyword" component={Searchhead} />
	 <Route path="/Exchange-index.html/list" component={List}/>
	 <Route path="/Exchange-index.html/home/"component={Home}/>

	</div>
  </Router>
);


render(
	<Provider store={store}>
	<Jf/>
	</Provider>,
	document.getElementById('root')
)

// registerServiceWorker();
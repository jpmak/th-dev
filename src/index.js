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
import Log from './containers/Log';
import IsOrder from './containers/IsOrder';
import SuccessView from './containers/SuccessView';
import AllOrder from './containers/AllOrder';
import OrderDetail from './containers/OrderDetail';
import TranList from './containers/TranList';
import NotFoundPage from './containers/NotFoundPage';



import reducer from './reducers';

import {
	createStore,
	applyMiddleware
} from 'redux'

import {
	Provider
} from 'react-redux'
import thunk from 'redux-thunk'


const middleware = [thunk]
	// if (process.env.NODE_ENV !== 'production') {
	// 	// middleware.push(createLogger())
	// 	middleware

// }
const store = createStore(
	reducer,
	applyMiddleware(...middleware)
)

const baseUrl = '/wa/Exchange-index.html';
const Jf = () => (
	<Router>
	<div>
	<Route exact path={baseUrl}  component={App} />
	<Route path={baseUrl+ '/login/:router?'}  component={Login} />
	 <Route path={baseUrl+'/product/:id?'} component={Detail}/>
	 <Route path={baseUrl+'/search/:keyword?'} component={Searchhead} />
	 <Route path={baseUrl +'/list/'} component={List}/>
	 <Route path={baseUrl+'/home/'} component={Home}/>
	 <Route path={baseUrl+'/log/'} component={Log}/>
	 <Route path={baseUrl+'/isorder/:id?'} component={IsOrder}/>
	 <Route path={baseUrl+'/successview/:id?'} component={SuccessView}/>
	 <Route path={baseUrl+'/allorder/'} component={AllOrder}/>
	 <Route path={baseUrl+'/orderdetail/:id?'} component={OrderDetail}/>
	 <Route path={baseUrl+'/TranList/:id?'} component={TranList}/>
	 <Route path={baseUrl+'/404/'} component={NotFoundPage}/>





	</div>
  </Router>
);


render(
	<Provider store={store}>
	<Jf/>
	</Provider>,
	document.getElementById('root')
)
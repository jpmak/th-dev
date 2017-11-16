import './styles/base.scss';
import './styles/jf.scss';
import 'core-js/fn/object/assign';

import React from 'react';
import {
	render
} from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch
} from 'react-router-dom'

import App from './containers/App';
import Detail from './containers/Detail';
import Searchhead from './containers/Searchhead';
import List from './containers/List';
import Login from './containers/Login';

import Log from './containers/Log';
import Home from './containers/Home';
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

// import * as NeedRouter from './containers/router/NeedRouter';
// const {
// 	NeedLogin,
// 	NeedLog,
// 	NeedHome,
// 	NeedIsOrder,
// 	NeedSuccessView,
// 	NeedAllOrder,
// 	NeedOrderDetail,
// 	NeedTranList
// } = NeedRouter;
// const Login = NeedLogin;
// const Log = NeedLog;
// const Home = NeedHome;
// const IsOrder = NeedIsOrder;
// const SuccessView = NeedSuccessView;
// const AllOrder = NeedAllOrder;
// const OrderDetail = NeedOrderDetail;
// const TranList = NeedTranList;

const middleware = [thunk]
const store = createStore(
	reducer,
	applyMiddleware(...middleware)
)
const Jf = () => {
	let baseUrl = ''
	if (process.env.NODE_ENV === 'production') {
		baseUrl = '/wap/Exchange-index.html'
	} else {
		baseUrl = '/wa/Exchange-index.html'

	}
	return (
		<Router>
	<Switch>

{/*	
<Route exact path={baseUrl}  component={App} />
<Route exact path='/'  component={App} />
	<Route path={baseUrl+ '/login/:routee.preventDefault();r?'}  component={Login} />

*/
}


<Route exact path={baseUrl}  component={App} />
	<Route path={baseUrl+ '/login'}  component={Login} />
	 <Route path={baseUrl+'/product/:id?'} component={Detail}/>
	 <Route path={baseUrl+'/search/:keyword?'} component={Searchhead} />
	 <Route path={baseUrl +'/list'} component={List}/>
	 <Route path={baseUrl+'/home'} component={Home}/>
	 <Route path={baseUrl+'/log'} component={Log}/>
	 <Route path={baseUrl+'/isorder/:id?'} component={IsOrder}/>
	 <Route path={baseUrl+'/successview/:id?'} component={SuccessView}/>
	 <Route path={baseUrl+'/allorder'} component={AllOrder}/>
	 <Route path={baseUrl+'/orderdetail/:id?'} component={OrderDetail}/>
	 <Route path={baseUrl+'/tranList/:id?'} component={TranList}/>

<Route path={baseUrl+'/404'} component={NotFoundPage} />
<Redirect from='*'  to={baseUrl+'/404'} />

  </Switch>
  </Router>

	)
}


render(
	<Provider store={store}>
	<Jf/>
	</Provider>,
	document.getElementById('root')
)
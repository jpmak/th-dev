import App from './App';
import Detail from './Detail';
import Searchhead from './Searchhead';
import List from './List';
import Login from './Login';

import Log from './Log';
import Home from './Home';
import IsOrder from './IsOrder';
import SuccessView from './SuccessView';
import AllOrder from './AllOrder';
import OrderDetail from './OrderDetail';
import TranList from './TranList';
import NotFoundPage from './NotFoundPage';
import {
	BrowserRouter as Router,
	Route,
	Redirect
} from 'react-router-dom'
import React from 'react'
const baseUrl = '/wa/Exchange-index.html';

export default (
	<Router>
	<div>
<Route exact path={baseUrl}  component={App} />
	<Route path={baseUrl+ '/login/:router?'}  component={Login} />
	 <Route path={baseUrl+'/product/:id?'} component={Detail}/>
	 <Route path={baseUrl+'/search/:keyword?'} component={Searchhead} />
	 <Route path={baseUrl +'/list'} component={List}/>
	 <Route path={baseUrl+'/home'} component={Home}/>
	 <Route path={baseUrl+'/log'} component={Log}/>
	 <Route path={baseUrl+'/isorder/:id?'} component={IsOrder}/>
	 <Route path={baseUrl+'/successview/:id?'} component={SuccessView}/>
	 <Route path={baseUrl+'/allorder'} component={AllOrder}/>
	 <Route path={baseUrl+'/orderdetail/:id?'} component={OrderDetail}/>
	 <Route path={baseUrl+'/TranList/:id?'} component={TranList}/>
<Route path={baseUrl+'/404'} component={NotFoundPage} />
	</div>
  </Router>
)
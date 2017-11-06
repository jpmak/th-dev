import express from 'express';
import React from 'react';
import {
	renderToString
} from 'react-dom/server';
import {
	RoutingContext,
	match
} from 'react-router';
import {
	Provider
} from 'react-redux';
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

const app = express();

function renderFullPage(html, initialState) {
	return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
    </head>
    <body>
      <div id="root">
        <div>
          ${html}
        </div>
      </div>
      <script>
        window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
      </script>
      <script src="/static/bundle.js"></script>
    </body>
    </html>
  `;
}


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
{/*	
<Route exact path={baseUrl}  component={App} />
<Route exact path='/'  component={App} />
*/
}
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
<Route path={baseUrl+'/404'} component={NotFoundPage} />
	</div>
  </Router>
);



app.use((req, res) => {
	match({
		Jf,
		location: req.url
	}, (err, redirectLocation, renderProps) => {
		if (err) {
			res.status(500).end(`Internal Server Error ${err}`);
		} else if (redirectLocation) {
			res.redirect(redirectLocation.pathname + redirectLocation.search);
		} else if (renderProps) {
			const store = configureStore();
			const state = store.getState();

			Promise.all([
					store.dispatch(fetchList()),
					store.dispatch(fetchItem(renderProps.params.id))
				])
				.then(() => {
					const html = renderToString(
						<Provider store={store}>
            <RoutingContext {...renderProps} />
          </Provider>
					);
					res.end(renderFullPage(html, store.getState()));
				});
		} else {
			res.status(404).end('Not found');
		}
	});
});
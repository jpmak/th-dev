import React from 'react';
import {
	render
} from 'react-dom';


// import Log from 'bundle-loader?lazy!../Log';
// import Home from 'bundle-loader?lazy!../Home';
// import IsOrder from 'bundle-loader?lazy!../IsOrder';
// import SuccessView from 'bundle-loader?lazy!../SuccessView';
// import AllOrder from 'bundle-loader?lazy!../AllOrder';
// import OrderDetail from 'bundle-loader?lazy!../OrderDetail';
// import TranList from 'bundle-loader?lazy!../TranList';
import Bundle from '../Bundle';

export const NeedLogin = (props) => {
	<Bundle load={() => import('../Login')}>
	{
		(Container) => <Container {...props}/>
	}
</Bundle>
}
export const NeedLog = (props) => {
	<Bundle load={() => import('../Log')}>
	{
		(Container) => <Container {...props}/>
	}
</Bundle>
}


export const NeedHome = (props) => {
	<Bundle load={() => import('../Home')}>
{(Container)=><Container {...props}/>}
</Bundle>
}
export const NeedIsOrder = (props) => {
	<Bundle load={() => import('../IsOrder')}>
{(Container)=><Container {...props}/>}
</Bundle>
}
export const NeedSuccessView = (props) => {
	<Bundle load={() => import('../SuccessView')}>
{(Container)=><Container {...props}/>}
</Bundle>
}
export const NeedAllOrder = (props) => {
	<Bundle load={() => import('../AllOrder')}>
{(Container)=><Container {...props}/>}
</Bundle>
}
export const NeedOrderDetail = (props) => {
	<Bundle load={() => import('../OrderDetail')}>
{(Container)=><Container {...props}/>}
</Bundle>
}
export const NeedTranList = (props) => {
	<Bundle load={() => import('../TranList')}>
{(Container)=><Container {...props}/>}
</Bundle>
}
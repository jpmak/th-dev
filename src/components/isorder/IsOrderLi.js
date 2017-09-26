import React from 'react';
import $ from 'jquery';

class IsOrderLi extends React.Component {

	render() {

		return (

			<div className="app-pd-list hor-list order">
                   <ul >
     <li  className='upItem'>
{/*

<div className='order shop' >
<div className='orderNum '><i></i><span>{this.props.orderLi.main_image}</span></div>

</div>
*/}
   <div className="info-img"><img src={this.props.orderLi.main_image}/></div><div className="info-bar"><div className="pro-title">{this.props.orderLi.goods_name}</div><div className="e-numb"><span className="e-price"><em>{this.props.orderLi.goods_price}</em>积分</span> <span className='orderNum'>X1</span> </div></div>    </li>
</ul>
</div>

		)
	}


}



export default IsOrderLi;
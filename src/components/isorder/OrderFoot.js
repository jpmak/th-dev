import React from 'react';
import $ from 'jquery';

class OrderFoot extends React.Component {
	settlement() {
		$('#payWay').show();
		$('.product-cover').removeClass('cover-mask-toggle').hide();
		$('.cover-mask').addClass('cover-mask-toggle').show();
	}

	render() {

		return (
			<div className="order-footer">
<div className="left-cont fl">
<label htmlFor="">合计</label>
<div className="total-wrap">
<div className="total"> <span className='num'>{this.props.orderLi.goods_price}</span><span >积分</span><i className='add'>+</i><span className='num'>{this.props.fee}</span><span>元服务费</span></div>
</div>
</div>
<div className="settle fr" onClick={this.settlement.bind(this)}>结算</div>
</div>
		)
	}


}

export default OrderFoot;
import React from 'react';

class IsOrderLi extends React.Component {

	render() {
		let valueHtml = '';
		if (this.props.orderLi.item_name) {
			valueHtml = (<div className="prop_value-title"><span>颜色分类：{this.props.orderLi.item_name}</span></div>)
		} else {
			valueHtml = ('');
		}
		let item_price = parseFloat(this.props.orderLi.item_price)
		let priceHtml = '';
		if (item_price !== 0) {
			priceHtml = (<span className='point'><span className='add'>+</span><em className='money'>¥</em>{this.props.orderLi.item_price}</span>)
		} else {
			priceHtml = (<span></span>)

		}
		return (

			<div className="app-pd-list hor-list order">
                   <ul >
     <li  className='upItem'>

   <div className="info-img"><img alt='' src={this.props.orderLi.main_image}/></div><div className="info-bar">
   <div className="pro-title">{this.props.orderLi.goods_name}</div>
       {
                    valueHtml
                }
   <div className="e-numb">
   <span className="e-price"><em className='moneyPrice'>{this.props.orderLi.exchange_points}</em>积分</span> <span className='orderNum'>X1</span> 
      {
                    priceHtml
                }
   </div></div>    </li>
</ul>
</div>

		)
	}


}



export default IsOrderLi;
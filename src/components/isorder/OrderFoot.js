import React from 'react';
import $ from 'jquery';
import Modal from '../../components/public/Modal';


class OrderFoot extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			gray: 'gray',
			ModalIicon: ''
		};
		this.cssGray = 'gray'
	}
	checkPrice() {
		let userTourism = this.props.userTourism;
		let userMoney = this.props.userMoney;
		let userBuy = this.props.userBuy;
		let item_price = this.props.item_price;
		if (userTourism < item_price && userMoney < item_price && userBuy < item_price) {
			return ' gray'
		}
	}
	settlement() {
		if (this.props.money < this.props.fee) {
			this.refs.Modal.handleOpenModal2()
			this.setState({
				ModalIicon: 2,
			});
			this.refs.Modal.setText2('惠积分不足支付服务费，请充值')

		} else if (this.cssGray === 'gray') {
			this.refs.Modal.handleOpenModal2()
			this.setState({
				ModalIicon: 2,
			});
			this.refs.Modal.setText2('没有可兑换积分')

		} else if (!this.props.addressItems.address_id) {
			this.refs.Modal.handleOpenModal2()
			this.setState({
				text: '请添加地址'
			});
		} else {

			$('#payWay').show();
			$('.product-cover').removeClass('cover-mask-toggle').hide();
			$('.cover-mask').addClass('cover-mask-toggle').show();
		}
	}

	render() {

		let userTourism = this.props.userTourism;
		let userMoney = this.props.userMoney;
		let userBuy = this.props.userBuy;
		let item_price = this.props.item_price;
		let money = this.props.money;
		let fee = this.props.fee;
		let tipHtml = [];
		if (userTourism < item_price && userMoney < item_price && userBuy < item_price) {
			this.cssGray = 'gray'
		} else if (money < fee) {
			this.cssGray = 'gray'
			tipHtml = (<div className='footerTip'><a  href='/wap/Recharge-index.html'><i></i><span className='fl'>当前惠积分:<strong>{this.props.money}</strong>, 不足支付服务费</span><span className='fr'>马上充值 ></span></a></div>)
		} else {
			this.cssGray = ''
		}

		return (
			<div>
		{
			tipHtml
		}
			<div className={'order-footer '+ this.cssGray}>
<div className="left-cont fl">
<label htmlFor="">合计</label>
<div className="total-wrap">
<div className="total"> <span className='num'>{this.props.item_price}</span><span >积分</span><i className='add'>+</i><span className='num'>{this.props.fee}</span><span>元服务费</span></div>
</div>
</div>
<div className="settle fr" onClick={this.settlement.bind(this)}>结算</div>
      <Modal ref='Modal' icon={this.state.ModalIicon}/>
</div>
</div>
		)
	}


}

export default OrderFoot;
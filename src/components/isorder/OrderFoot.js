import React from 'react';
import $ from 'jquery';
import Modal from 'react-modal';
const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		background: '#000',
		opacity: '.5',
		color: '#fff',
		padding: '20px'
	},
	overlay: {
		background: 'none',
	}
};
class OrderFoot extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modalIsOpen: false,
			text: '',
			gray: 'gray'
		};
		this.cssGray = 'gray'
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);

	}
	openModal() {
		this.setState({
				modalIsOpen: true
			},
			() => {
				setTimeout(this.closeModal, 2000)
			}

		);
	}
	closeModal() {
		this.setState({
			modalIsOpen: false
		});
	}
	componentDidMount() {

	}
	checkPrice() {
		let userTourism = this.props.userTourism;
		let userMoney = this.props.userMoney;
		let userBuy = this.props.userBuy;
		let goods_price = this.props.goods_price;
		if (userTourism < goods_price && userMoney < goods_price && userBuy < goods_price) {
			return ' gray'
		}
	}

	settlement() {

			// let goods_price = 0;



			if (this.state.gray === 'gray') {
				this.setState({
					text: '抱歉，你没有可兑换的积分',

				});
				this.openModal();

			} else if (!this.props.addressItems.address_id) {
				this.setState({
					text: '请添加地址'
				});
				this.openModal();

			} else {

				$('#payWay').show();
				$('.product-cover').removeClass('cover-mask-toggle').hide();
				$('.cover-mask').addClass('cover-mask-toggle').show();
			}
		}
		// componentWillReceiveProps(nextProps) {
		// 	if (nextProps.goods_price !== this.props.goods_price) {
		// 		console.log('ghotest');


	// 	}
	// }
	render() {
		// let cssGray = 'gray'
		let userTourism = this.props.userTourism;
		let userMoney = this.props.userMoney;
		let userBuy = this.props.userBuy;
		let goods_price = this.props.goods_price;
		if (userTourism < goods_price && userMoney < goods_price && userBuy < goods_price) {
			this.cssGray = 'gray'
		} else {
			this.cssGray = ''
		}

		// console.log(userTourism);
		// console.log(userMoney);

		// console.log(userBuy);
		// <div className={'order-footer '+ this.props.gray}>
		return (
			<div className={'order-footer '+ this.cssGray}>
<div className="left-cont fl">
<label htmlFor="">合计</label>
<div className="total-wrap">
<div className="total"> <span className='num'>{this.props.orderLi.goods_price}</span><span >积分</span><i className='add'>+</i><span className='num'>{this.props.fee}</span><span>元服务费</span></div>
</div>
</div>
<div className="settle fr" onClick={this.settlement.bind(this)}>结算</div>
    <Modal isOpen={this.state.modalIsOpen}          // onAfterOpen={this.afterOpenModal}
          // onRequestClose={this.closeModal}
                    style={customStyles}   contentLabel="Example Modal"  >
        <p>{this.state.text}</p>
        </Modal>
</div>
		)
	}


}

export default OrderFoot;
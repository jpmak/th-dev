import React from 'react';

class WechatSdk extends React.Component {
	constructor(props) {
		super(props);

		// this.signatureMap = [];
		// this.errorMessage = null;
		// this.ready = false;

		// this.bindActions(WechatSdkActions);
		this.weChatState = {}


	}
	componentDidMount() {

			// this.weChatState = {
			// 		appId: 'wx634a21407ee85ff5',
			// 		timestamp: '1507600121',
			// 		nonceStr: '93qvntp6im0bhp231wy82x51cj2hji3e',
			// 		signature: 'a4286c08063c08252fba98826ed1edc22e9374ef',
			// 		jsApiList: this.props.jsApiList
			// 	}
			// 	// this.weChatState = {
			// 	// 		appId: this.props.appId,
			// 	// 		timestamp: this.props.timestamp,
			// 	// 		nonceStr: this.props.noncestr,
			// 	// 		signature: this.props.signature,
			// 	// 		jsApiList: this.props.jsApiList
			// 	// 	}
			// window.wx.config(this.weChatState);
		}
		// onUpdateSignatureMap(signatureMap) {
		// 	this.signatureMap = signatureMap;
		// 	this.errorMessage = null;

	// 	let weChatState = {

	// 		appId: this.props.appId,
	// 		timestamp: this.props.timestamp,
	// 		nonceStr: this.props.noncestr,
	// 		signature: this.props.signature,
	// 		jsApiList: this.props.jsApiList
	// 	}

	// 	window.wx.config(weChatState);

	// 	// window.wx.ready(() => {
	// 	// 	this.ready = true;
	// 	// });

	// 	// window.wx.error((err) => {
	// 	// 	this.ready = false;

	// 	// 	console.error(JSON.stringify(err))
	// 	// });

	// }


	render() {
		// console.log(this.weChatState)
		return (
			<div></div>
			// 	<a className="class th-nav-back" onClick={this.go.bind(this)}></a>
		)


	}
}

export default WechatSdk;
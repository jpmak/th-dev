import React from 'react';

class IsOrderAddress extends React.Component {

	renderPage() {

	}

	render() {
		let renderHtml = [];
		let router = [];
		if (!this.props.addressItems.address_id) {
			renderHtml = (<div className="left-cont" style={{textAlign:'center',padding:'20px'}}>请添加邮寄地址</div>)

		} else {
			renderHtml = (<div className="left-cont">
		<dl>
		<dt>收件人</dt>
		<dd>{this.props.addressItems.consignee?this.props.addressItems.consignee:''}</dd>
		</dl>
		<dl>
		<dt>电话</dt>
		<dd>{this.props.addressItems.mobile?this.props.addressItems.mobile:''}</dd>
		</dl>
		<dl>
		<dt>地区</dt>
				<dd>{this.props.addressItems.province} {this.props.addressItems.city} {this.props.addressItems.area}</dd>
		</dl>
		<dl>
		<dt>地址</dt>
		<dd>{this.props.addressItems.address?this.props.addressItems.address:''}</dd>
		</dl>
		</div>)
		}
		if (this.props.addressItems.address_id) {
			router = (<a  href={'/wap/User-editAddress-'+this.props.addressItems.address_id+'.html'}>编辑 </a>)
		} else {
			router = (<div></div>);
		}


		return (
			<div className="user-info">
		<i className="border"></i>
				{
					renderHtml
				}

		<div className='addressChange'>{router}<a  href="/wap/User-addAddress.html">添加</a></div>

		<i className="border"></i>
		</div>

		)
	}


}

export default IsOrderAddress;
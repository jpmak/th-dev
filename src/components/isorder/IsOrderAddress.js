import React from 'react';

class IsOrderAddress extends React.Component {


	render() {

		return (
			<div className="user-info">
<i className="border"></i>
<div className="left-cont">
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
</div>
{/*
<div className='addressChange'><a  href="User-editAddress-1299.html">编辑</a> / <a  href="User-address.html">更换</a></div>
*/}
<i className="border"></i>
</div>

		)
	}


}

export default IsOrderAddress;
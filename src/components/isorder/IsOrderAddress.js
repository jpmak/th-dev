import React from 'react';
    
class IsOrderAddress extends React.Component {
  

    render() {
      
        return (
    <div className="user-info">
<i className="border"></i>
<div className="left-cont">
<dl>
<dt>收件人</dt>
<dd>麦少云</dd>
</dl>
<dl>
<dt>电话</dt>
<dd>13570233661</dd>
</dl>
<dl>
<dt>地区</dt>
<dd>广东 佛山市 南海区</dd>
</dl>
<dl>
<dt>地址</dt>
<dd>西樵镇海北东路新街二巷5号</dd>
</dl>
</div>
<div className='addressChange'><a  href="User-editAddress-1299.html">编辑</a> / <a  href="User-address.html">更换</a></div>
<i className="border"></i>
</div>

        )
    }


}

export default IsOrderAddress;
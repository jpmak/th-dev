import React from 'react';
    
class OrderFoot extends React.Component {
  

    render() {
      
        return (
<div className="order-footer">
<div className="left-cont fl">
<label for="">合计</label>
<div className="total-wrap">
<div className="total">¥ <span id="order_amcount">199.00</span></div>
<div className="integral">获得旅游积分<span id="tourism_point">0</span></div>
</div>
</div>
<div className="settle fr" onclick="upsUp()">结算</div>
</div>
        )
    }


}

export default OrderFoot;
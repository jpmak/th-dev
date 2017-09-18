import React from 'react';
import $ from 'jquery';

class PayWay extends React.Component {
    chooseType() {
        $('#chooseTypeWrap .payWay').show();
        console.log('test');
        $('#payWay').hide();


    }
    render() {
        return (
            <div>
            <div id='payWay' className="payWay">
   <div className="product-icon cover-close">
        <a className="close"></a>
                </div>

<div className='wbox-flex payTitle'>付款方式</div>
<ul className='payList'>
<li >
    <label >付款金额</label>
    <p className="payMoney"><em>¥</em><span>18.50</span></p>
</li>
<li>
    <label >付款账号</label>
    <p>小麦</p>
</li>
<li onClick={this.chooseType.bind(this)}>
    <label>兑换积分类型</label>
    <p><span>购物积分</span><em className='blockUp'></em></p>
</li>
<li>
    <label>付款方式</label>
    <p><i className='payIcon'></i><span>惠积分支付</span><em className='blockUp'></em></p>
</li>
</ul>
            <div className='fix-box product-payup'>
        <div className='pay-item'>
        <div className='wbox-flex tc exchange-submit'>
        <a className='th-btn th-btn-assertive'>确认支付</a>
                        </div>
                    </div>
                </div>
                </div>
                <ChooseType/>
                </div>
        )

    }
}


class ChooseType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: '0',
        }
    };
    cheack(index) {
        return index === this.state.currentIndex ? 'cur' : '';

    }
    handleClick(e) {
        let num = e.target.getAttribute('data-Num')
        this.setState({
            currentIndex: num
        })


    }
    handlePush() {
        $('#chooseTypeWrap .payWay').hide();

        $('.cover-mask').removeClass('cover-mask-toggle').hide();


    }
    render() {

        return (
            <div id='chooseTypeWrap'>
            <div className="payWay">

<a className="class th-nav-back" onClick={this.handlePush.bind(this)}> </a>
<div className='wbox-flex payTitle'>选择积分类型</div>
<ul className='payList'>
<li className={this.cheack('0')} data-Id="balance_point" data-Num='0' onClick={this.handleClick.bind(this)}> 
    <label >排点积分</label>
   <i className="round"></i>
</li>
<li className={this.cheack('1')} data-Id="travel_point" data-Num='1' onClick={this.handleClick.bind(this)}>
    <label >旅游积分</label>
   <i className="round"></i>
</li>
<li className={this.cheack('2')} data-Id="point" data-Num='2' onClick={this.handleClick.bind(this)}> 
    <label>购物积分</label>
   <i className="round"></i>
</li>

</ul>
            <div className='fix-box product-payup' onClick={this.handlePush.bind(this)}>
        <div className='pay-item'>
        <div className='wbox-flex tc exchange-submit'>
        <a className='th-btn th-btn-assertive'>确定</a>
                        </div>
                    </div>
                </div>
                </div>
                </div>
        )
    }
}
export default PayWay;
import React from 'react';
import $ from 'jquery';

class PayWay extends React.Component {
    constructor(props) {
        super(props);

        this.tips = {
            'balance_point': '排点积分',
            'travel_point': '旅游积分',
            'point': '购物积分'

        };

    }
    chooseType() {
        $('#chooseTypeWrap .payWay').show();
        $('#payWay').hide();


    }
    changeChooseId(id) {
        this.props.changeChooseId(id)
    }
    open() {
        $('#payWay').hide();

        $('#paypwd').show();

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
    <label >支付服务费</label>
    <p className="payMoney"><em>¥</em><span>{this.props.fee?this.props.fee:0}</span></p>
</li>
<li>
    <label >付款账号</label>
    <p>{this.props.userName}</p>
</li>
<li onClick={this.chooseType.bind(this)}>
    <label>兑换积分类型</label>
    <p><span>{this.tips[this.props.chooseId]}</span><em className='blockUp'></em></p>
</li>
<li>
    <label>付款方式</label>
    <p><i className='payIcon'></i><span>惠积分支付</span></p>
</li>
</ul>
            <div className='fix-box product-payup'  onClick={this.open.bind(this)}>
        <div className='pay-item'>
        <div className='wbox-flex tc exchange-submit'>
        <a className='th-btn th-btn-assertive'>确认支付</a>
                        </div>
                    </div>
                </div>
                </div>
                <ChooseType changeChooseId={this.changeChooseId.bind(this)} chooseId={this.props.chooseId} userMoney={this.props.userMoney}  userBuy={this.props.userBuy} userTourism={this.props.userTourism}  item_price={ this.props.item_price}/>
                </div>
        )

    }
}


class ChooseType extends React.Component {
    componentDidMount() {
        this.state = {
            currentIndex: this.props.chooseId,

        }

    }
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: this.props.chooseId,
            pushId: '0'
        }
    };
    cheack(index, money) {
        let goods_price = parseInt(this.props.item_price)
        if (money >= goods_price && index === this.state.currentIndex) {
            return 'cur'
        } else if (money >= goods_price && index !== this.state.currentIndex) {
            return '    '

        } else if (money < goods_price) {
            return 'pointerNone'
        }

        // return index === this.state.currentIndex ? 'cur' : '';

        // return index === this.state.currentIndex ? 'cur' : '';

    }

    handleClick(e, event) {

        event.stopPropagation();


        this.setState({
            currentIndex: e,
            // pushId: id
        }, () => {
            console.log(this.state.currentIndex);

        })



    }
    stopPropagation(event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
    handlePush() {
        this.props.changeChooseId(this.state.currentIndex)
        console.log(this.state.currentIndex)
        $('#chooseTypeWrap .payWay').hide();
        $('.cover-mask').removeClass('cover-mask-toggle').hide();

    }
    handleBack() {
        $('#chooseTypeWrap .payWay').hide();
        $('#payWay').show();
        $("#payPassword_rsainput").keyup()

    }
    render() {

        let userMoney = this.props.userMoney
        let userTourism = this.props.userTourism
        let userBuy = this.props.userBuy
            // console.log(this.props.userMoney);
            // console.log(this.props.userTourism);
            // console.log(this.props.userBuy);

        return (
            <div id='chooseTypeWrap'>
            <div className="payWay">

<a className="class th-nav-back" onClick={this.handleBack.bind(this)}> </a>
<div className='wbox-flex payTitle'>选择积分类型</div>
<ul className='payList'>
<li className={this.cheack('balance_point',this.props.userMoney)}   data-Id="balance_point" data-Num='0' data-Money={userMoney} onClick={this.handleClick.bind(this,'balance_point')}> 
    <label >排点积分</label>
    <p>
       <span className='num'>{userMoney}</span>
   <span  className='jf'>积分</span>
   <i className="round"></i>
   </p>
</li>
<li className={this.cheack('travel_point',this.props.userTourism)} data-Id="travel_point" data-Num='1' data-Money={userBuy} onClick={this.handleClick.bind(this,'travel_point')}>
    <label >旅游积分</label>
        <p>
       <span className='num'>{userTourism}</span>
   <span className='jf'>积分</span>
   <i className="round"></i>
   </p>

</li>
<li className={this.cheack('point',this.props.userBuy)} data-Id="point" data-Num='2'  data-Money={userBuy} onClick={this.handleClick.bind(this,'point')}> 
    <label>购物积分</label>
    <p>
       <span className='num'>{userBuy}</span>
   <span  className='jf'>积分</span>
   <i className="round"></i>
   </p>
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
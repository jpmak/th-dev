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
        $('#paypwd').show().focus();
    }
    componentDidMount() {
        $('#payUp').on("click", function() {
            $('#payWay').hide();
            $('#paypwd').show();
            $('#payPassword_rsainput').focus()
        });
    }
    render() {
        let fee = parseFloat(this.props.fee);
        let item_price = parseFloat(this.props.item_price);
        let totalPrice = fee + item_price
            // onClick={this.open.bind(this)}
        return (
            <div>
            <div id='payWay' className="payWay">
   <div className="product-icon cover-close">
        <a className="close"></a>
                </div>

<div className='wbox-flex payTitle'>付款方式</div>
<ul className='payList'>
<li >
    <label >支付费用</label>
    <p className="payMoney"><span>{totalPrice}</span></p>
</li>
<li>
    <label >付款账号</label>
    <p>{this.props.userName}</p>
</li>
<li onClick={this.chooseType.bind(this)}>
    <label>兑换积分类型</label>
    <p><span className='num'>{this.props.exchange_points}</span><span>{this.tips[this.props.chooseId]}</span><em className='blockUp'></em></p>
</li>
<li>
    <label>付款方式</label>
    <p><i className='payIcon'></i><span>惠积分支付</span></p>
</li>
</ul>
            <div  id='payUp' className='fix-box product-payup' >
        <div className='pay-item'>
        <div className='wbox-flex tc exchange-submit'>
        <a className='th-btn th-btn-assertive'>确认支付</a>
                        </div>
                    </div>
                </div>
                </div>
                <ChooseType objectList={this.props.objectList} exchange_points={this.props.exchange_points} changeChooseId={this.changeChooseId.bind(this)} chooseId={this.props.chooseId} userMoney={this.props.userMoney}  userBuy={this.props.userBuy} userTourism={this.props.userTourism}  item_price={ this.props.item_price}/>
                </div>
        )

    }
}


class ChooseType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: '0',
            pushId: '0'
        }
        this.objectLi = [];
    };
    cheack(type, money) {

        let exchange_points = this.props.exchange_points
        if (type === this.props.chooseId && money >= exchange_points) {
            return 'cur'
        } else if (money < exchange_points) {
            return 'pointerNone'
        }
    }

    handleClick(type) {
        this.props.changeChooseId(type)

    }
    stopPropagation(event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
    handlePush() {
        $('#chooseTypeWrap .payWay').hide();
        $('.cover-mask').removeClass('cover-mask-toggle').hide();
    }
    handleBack() {
        $('#chooseTypeWrap .payWay').hide();
        $('#payWay').show();
    }

    render() {
        let paywayHtml = '';
      let objectLis = this.props.objectList;
        if (objectLis.length > 0) {
            paywayHtml = objectLis.map((objectLi, index) => {
                return (
                    <li key={index} className={this.cheack(objectLi.name,objectLi.num)}  onClick={this.handleClick.bind(this,objectLi.name)}><label>{objectLi.jf}</label><p><span className='num'>{objectLi.num}</span><span  className='jf'>积分</span><i className="round"></i></p></li>
                )
            })
        }
        return (
            <div id='chooseTypeWrap'>
            <div className="payWay" style={{height:'34%'}}>
<a className="class th-nav-back" onClick={this.handleBack.bind(this)}> </a>
<div className='wbox-flex payTitle'>选择积分类型</div>
<ul className='payList'>
        {
            paywayHtml
        }
        {/*
 
*/}
</ul>
{/*
          
*/}
                </div>
                </div>
        )
    }
}
export default PayWay;
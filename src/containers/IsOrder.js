import React from 'react';
import $ from 'jquery';
import TopNav from '../components/TopNav';
import Goback from '../components/public/Goback';
import IsOrderAddress from '../components/isorder/IsOrderAddress';
import IsOrderLi from '../components/isorder/IsOrderLi';
import OrderFoot from '../components/isorder/OrderFoot';

import PayWay from '../components/isorder/PayWay';
import PayPwd from '../components/isorder/PayPwd';
import CoverMask from '../components/detail/CoverMask';



import {
    beginUser
} from '../actions'
import {
    connect
} from 'react-redux'

class IsOrder extends React.Component {

    constructor(props) {
        super(props);
        this.mounted = false;
        this.state = {
            addressItems: [],
            orderLi: [],
            item_price: 0,
            exchange_points: 0,
            item_number: '',
            csrf: '',
            fee: '0',
            payWay: '排点',
            chooseId: 'balance_point',
            gray: 'gray'
        };
    }

    componentWillMount() {
        if (!this.props.userStatus) {
            this.props.dispatch(beginUser())
        }
    }
    componentDidMount() {
        this.fetchOrder();
    }

    fetchOrder() {
        $.ajax({
            url: '/wap/?g=WapSite&c=Exchange&a=get_order_info',
            dataType: 'json',
            type: 'post',
            'data': {
                'item_id': this.props.id ? this.props.id : this.props.match.params.id
            },
            success: (data) => {
                let goods_price = parseFloat(data.info.goods_info.goods_price)
                this.setState({
                    addressItems: data.info.address_all,
                    item_price: parseFloat(data.info.goods_info.goods_price),
                    item_number: data.info.goods_info.item_number,
                    exchange_points: data.info.goods_info.exchange_points,
                    orderLi: data.info.goods_info,
                    fee: data.info.fee,
                    csrf: data.info.csrf
                }, () => {
                    this.checkId(goods_price)
                });
            },
            error: () => {
                console.log('网络异常');
            }
        });
    }

    chooseId(id) {
        this.chooseId = id

    }
    changeChooseId(id) {
        this.setState({
            chooseId: id
        })
    }
    successView(e) {
        this.props.history.push('/Exchange-index.html/successview/' + e)
    }
    checkId(exchange_points) {
        let userTourism = this.props.userTourism;
        let userMoney = this.props.userMoney;
        let userBuy = this.props.userBuy;

        if (userMoney >= exchange_points) {
            this.setState({
                chooseId: 'balance_point'
            })
        }
        if (userTourism >= exchange_points) {
            this.setState({
                chooseId: 'travel_point'
            })
        }
        if (userBuy >= exchange_points) {
            this.setState({
                chooseId: 'point'
            })

        }
    }
    openPay() {
        setTimeout(this.refs.PayPwd.focus, 0)

    }
    renderPage() {
        return (
            <div >
        <TopNav titleName = "确认订单"  border='0'/>
               <div className='w'>
        <IsOrderAddress addressItems={this.state.addressItems}/>
        <IsOrderLi orderLi={this.state.orderLi}/>
        <PayWay open={this.openPay.bind(this)} changeChooseId={this.changeChooseId.bind(this)} chooseId={this.state.chooseId} fee={this.state.fee}  item_price={this.state.item_price}  orderLi={this.state.orderLi} userName={this.props.userName} userMoney={this.props.userMoney}  userBuy={this.props.userBuy} userTourism={this.props.userTourism}  />
            <CoverMask />
        <PayPwd ref='PayPwd' csrf={this.state.csrf}  item_price={this.state.item_price} successView={this.successView.bind(this)} chooseId={this.state.chooseId} addressId={this.state.addressItems.address_id}/>
        <OrderFoot exchange_points={this.state.exchange_points} gray={this.state.gray} addressItems={this.state.addressItems} csrf={this.state.csrf} fee={this.state.fee} orderLi={this.state.orderLi} userMoney={this.props.userMoney}  userBuy={this.props.userBuy} userTourism={this.props.userTourism} item_price={this.state.item_price} fee={this.state.fee}  money={this.props.money} />

   </div>

</div>)
    }
    render() {
        let renderHtml = [];
        renderHtml = this.renderPage();
        return (
            <div>
        {
            renderHtml
        }
        </div>
        );


    }
}
const mapStateToProps = state => {
    return {
        id: state.MsgDetailReducer.id,
        item_price: state.MsgDetailReducer.item_price,
        exchange_points: state.MsgDetailReducer.exchange_points,
        userStatus: state.MsgAppReducer.userStatus,
        userName: state.MsgAppReducer.userName,
        money: state.MsgAppReducer.money, //排点积分
        userMoney: state.MsgAppReducer.userMoney, //排点积分
        userBuy: state.MsgAppReducer.userBuy, //购物积分
        userTourism: state.MsgAppReducer.userTourism, //旅游积分
    }
}
export default connect(mapStateToProps)(IsOrder)
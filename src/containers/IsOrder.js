import React from 'react';
import $ from 'jquery';
import TopNav from '../components/TopNav';
import Goback from '../components/public/Goback';
import IsOrderAddress from '../components/isorder/IsOrderAddress';
import IsOrderLi from '../components/isorder/IsOrderLi';
import OrderFoot from '../components/isorder/OrderFoot';

import CoverMask from '../components/detail/CoverMask';
import PayWay from '../components/detail/PayWay';
import PayPwd from '../components/isorder/PayPwd';


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
                csrf: '',
                fee: '0',
                payWay: '排点',
                chooseId: 'balance_point',
                gray: 'gray'

            };
            // goodsList = goodsList || this.state.goodsList;
        }
        // componentWillMount() {
        //     if (window.localStorage.user_info != 1) {
        //         this.props.history.push('/Exchange-index.html/login/IsOrder/')
        //     }


    // }
    componentWillMount() {
        this.fetchOrder();
        if (!this.props.userStatus) {
            this.props.dispatch(beginUser())

        }
    }
    componentDidMount() {



        // this.checkChoose();
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
                this.setState({
                    addressItems: data.info.address_all,
                    orderLi: data.info.goods_info,
                    fee: data.info.fee,
                    csrf: data.info.csrf
                });

            },
            error: () => {
                console.log('网络异常');
            }
        });
    }

    chooseId(id) {
            this.setState({
                chooseId: id
            })
        }
        // 'balance_point':'排点积分',
        //    'travel_point':'旅游积分',
        //    'point':'购物积分'
    checkChoose() {
        let userTourism = this.props.userTourism;
        let userMoney = this.props.userMoney;
        let userBuy = this.props.userBuy;
        let goods_price = 99;

        if (userMoney >= goods_price) {
            this.setState({
                chooseId: 'balance_point'
            })

        }
        if (userTourism >= goods_price) {
            this.setState({
                chooseId: 'userTourism'
            })

        }
        if (userBuy >= goods_price) {
            this.setState({
                chooseId: 'point'
            })

        }
        //
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.userStatus !== this.props.userStatus) {

            let userTourism = nextProps.userTourism;
            let userMoney = nextProps.userMoney;
            let userBuy = nextProps.userBuy;
            let goods_price = nextProps.item_price

            if (userMoney >= goods_price) {
                this.setState({
                    chooseId: 'balance_point'
                })

            }
            if (userTourism >= goods_price) {
                this.setState({
                    chooseId: 'userTourism'
                })

            }
            if (userBuy >= goods_price) {
                this.setState({
                    chooseId: 'point'
                })

            }
        }
    }
    renderPage() {

        return (
            <div >
        <TopNav titleName = "确认订单" />

               <div className='w'>
        <IsOrderAddress addressItems={this.state.addressItems}/>
        <IsOrderLi orderLi={this.state.orderLi}/>
        <PayWay chooseId={this.state.chooseId} fee={this.state.fee} orderLi={this.state.orderLi} userName={this.props.userName} userMoney={this.props.userMoney}  userBuy={this.props.userBuy} userTourism={this.props.userTourism} goods_price={this.state.orderLi.goods_price}/>
            <CoverMask />
        <PayPwd csrf={this.state.csrf} chooseId={this.state.chooseId} addressId={this.state.addressItems.address_id}/>
<OrderFoot gray={this.state.gray}  addressItems={this.state.addressItems} csrf={this.state.csrf} fee={this.state.fee} orderLi={this.state.orderLi} userMoney={this.props.userMoney}  userBuy={this.props.userBuy} userTourism={this.props.userTourism} goods_price={this.state.orderLi.goods_price} />

   </div>

</div>)


    }
    render() {

        // console.log(this.props.userBuy)
        //                console.log(this.props.userStatus)
        //                console.log(this.state.chooseId)

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
        userStatus: state.MsgAppReducer.userStatus,
        userName: state.MsgAppReducer.userName,
        userMoney: state.MsgAppReducer.userMoney, //惠积分
        userBuy: state.MsgAppReducer.userBuy, //购物积分
        userTourism: state.MsgAppReducer.userTourism, //旅游积分
    }
}
export default connect(mapStateToProps)(IsOrder)
import React from 'react';
import $ from 'jquery';
import TopNav from '../components/TopNav';
import Goback from '../components/public/Goback';
import IsOrderAddress from '../components/isorder/IsOrderAddress';
import IsOrderLi from '../components/isorder/IsOrderLi';
import OrderFoot from '../components/isorder/OrderFoot';

import CoverMask from '../components/detail/CoverMask';
import PayWay from '../components/detail/PayWay';
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
                payWay: '排点'

            };
            // goodsList = goodsList || this.state.goodsList;
        }
        // componentWillMount() {
        //     if (window.localStorage.user_info != 1) {
        //         this.props.history.push('/Exchange-index.html/login/IsOrder/')
        //     }


    // }
    componentDidMount() {
        if (!this.props.userStatus) {
            this.props.dispatch(beginUser())
            this.fetchOrder();
        }
    }

    fetchOrder() {
        $.ajax({
            url: '/wap/?g=WapSite&c=Exchange&a=get_order_info',
            dataType: 'json',
            type: 'post',
            'data': {
                'item_id': 291
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


    renderPage() {
        return (
            <div >
        <TopNav titleName = "确认订单" />

               <div className='w'>
        <IsOrderAddress addressItems={this.state.addressItems}/>
        <IsOrderLi orderLi={this.state.orderLi}/>
<OrderFoot csrf={this.state.csrf} fee={this.state.fee} orderLi={this.state.orderLi}/>
        <PayWay fee={this.state.fee} orderLi={this.state.orderLi} userName={this.props.userName} userMoney={this.props.userMoney}  userBuy={this.props.userBuy} userTourism={this.props.userTourism} goods_price={this.state.orderLi.goods_price}/>
            <CoverMask />
   </div>

</div>)


    }
    render() {
        console.log(this.props.userStatus);
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
        userStatus: state.MsgAppReducer.userStatus,
        userName: state.MsgAppReducer.userName,
        userMoney: state.MsgAppReducer.userMoney, //惠积分
        userBuy: state.MsgAppReducer.userBuy, //购物积分
        userTourism: state.MsgAppReducer.userTourism, //旅游积分
    }
}
export default connect(mapStateToProps)(IsOrder)
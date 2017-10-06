import React from 'react';
import $ from 'jquery';
import TopNav from '../components/TopNav';
import Goback from '../components/public/Goback';
import IsOrderAddress from '../components/isorder/IsOrderAddress';
import IsOrderLi from '../components/isorder/IsOrderLi';
import OrderFoot from '../components/isorder/OrderFoot';

import PayWay from '../components/detail/PayWay';
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
            // this.chooseId='balance_point'
            this.state = {
                addressItems: [],
                orderLi: [],
                item_price: '',
                item_number:'',
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
        if (!this.props.userStatus) {
            this.props.dispatch(beginUser())

        }
    }
    componentDidMount() {

        this.fetchOrder();


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
                let goods_price = parseInt(data.info.goods_info.goods_price)
                    // console.log(data.info.goods_info.goods_price)
                this.checkId(goods_price)
                this.setState({
                    addressItems: data.info.address_all,
                    item_price: data.info.goods_info.goods_price,
item_number:data.info.goods_info.item_number,
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

        this.chooseId = id

    }
    changeChooseId(id) {
        this.setState({
            chooseId: id
        })
    }
    successView(e){
         this.props.history.push('/Exchange-index.html/successview/'+e)
    }
    checkId(item_price) {
            let userTourism = this.props.userTourism;
            let userMoney = this.props.userMoney;
            let userBuy = this.props.userBuy;
            if (userMoney >= item_price) {
                this.setState({
                    chooseId: 'balance_point'
                })
            }
            if (userTourism >= item_price) {
                this.setState({
                    chooseId: 'travel_point'
                })
            }
            if (userBuy >= item_price) {
                this.setState({
                    chooseId: 'point'
                })

            }
        }
        // 'balance_point':'排点积分',
        //    'travel_point':'旅游积分',
        //    'point':'购物积分'
        // checkChoose() {
        //     let userTourism = this.props.userTourism;
        //     let userMoney = this.props.userMoney;
        //     let userBuy = this.props.userBuy;
        //     let item_price = this.props.item_price;

    //     if (userMoney >= item_price) {
    //         this.setState({
    //             chooseId: 'balance_point'
    //         })

    //     }
    //     if (userTourism >= item_price) {

    //         this.setState({
    //             chooseId: 'travel_point'
    //         })

    //     }
    //     if (userBuy >= item_price) {


    //         this.setState({
    //             chooseId: 'point'
    //         })

    //     }
    //     //
    // }
    //     componentWillReceiveProps(nextProps) {
    //         if (nextProps.userStatus !== this.props.userStatus) {

    //             let userMoney = nextProps.userMoney;
    //             let userTourism = nextProps.userTourism;
    //             let userBuy = nextProps.userBuy;
    //             let item_price =100;
    // console.log(userTourism)
    // console.log(userMoney)
    //  console.log(userBuy)
    //  console.log(this.props.item_price)



    //         }
    //     }
    renderPage() {

        return (
            <div >
        <TopNav titleName = "确认订单" />

               <div className='w'>
        <IsOrderAddress addressItems={this.state.addressItems}/>
        <IsOrderLi orderLi={this.state.orderLi}/>
        <PayWay changeChooseId={this.changeChooseId.bind(this)} chooseId={this.state.chooseId} fee={this.state.fee} orderLi={this.state.orderLi} userName={this.props.userName} userMoney={this.props.userMoney}  userBuy={this.props.userBuy} userTourism={this.props.userTourism} item_price={this.state.item_price} />
            <CoverMask />
        <PayPwd csrf={this.state.csrf} successView={this.successView.bind(this)} chooseId={this.state.chooseId} addressId={this.state.addressItems.address_id}/>
<OrderFoot gray={this.state.gray} fee={this.state.fee} addressItems={this.state.addressItems} csrf={this.state.csrf} fee={this.state.fee} orderLi={this.state.orderLi} userMoney={this.props.userMoney}  userBuy={this.props.userBuy} userTourism={this.props.userTourism} item_price={this.state.item_price} money={this.props.money} />

   </div>

</div>)


    }
    render() {
        // console.log(this.state.chooseId)

        // console.log(this.state.item_price)
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
        money: state.MsgAppReducer.money, //排点积分

        userMoney: state.MsgAppReducer.userMoney, //排点积分
        userBuy: state.MsgAppReducer.userBuy, //购物积分
        userTourism: state.MsgAppReducer.userTourism, //旅游积分
    }
}
export default connect(mapStateToProps)(IsOrder)
import React from 'react';
import {
    connect
} from 'react-redux'
import '../styles/userInfo.scss';
import Modal from 'react-modal';
import $ from 'jquery';

import TopNav from '../components/TopNav';
import Goback from '../components/public/Goback';
import PayPwd from '../components/isorder/PayPwd';
import CoverMask from '../components/detail/CoverMask';

import InfoGoods from '../components/info/InfoGoods';

import {
    tryRestoreComponent,
    beginUser,

} from '../actions'
// import ResultWrap from '../components/search/ResultWrap';
import {
    OrderDetailTryRestoreComponent,
    beginRefresh,
    fetchOrderDetailGoods,
    updateOrderDetailLoadingStatus,
    backupIScrollY

} from '../actions/orderDetail'
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: '#000',
        opacity: '.5',
        color: '#fff',
        padding: '20px'
    },
    overlay: {
        background: 'none',
        zIndex: '999'
    }
};

class OrderDetail extends React.Component {
    constructor(props) {
        super(props);
        this.scrollTop = 0;
        this.orderDetailHandleScroll = this.orderDetailHandleScroll.bind(this);
        this.state = {
            modalIsOpen: false,
            text: '',
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    };

    componentWillMount() {
        let p = new Promise(function(resolve, reject) {});

        if (window.localStorage.user_info != 1) {
            p.then(this.props.history.push('/Exchange-index.html/login/orderDetail/'))
        } else {

            this.props.dispatch(OrderDetailTryRestoreComponent());
        }


    }


    componentDidMount() {


        window.addEventListener('scroll', this.orderDetailHandleScroll);
        if (this.props.orderDetailLoadingStatus === 1 || this.props.userStatus === 0) {
            this.props.dispatch(beginUser())
            this.props.dispatch(beginRefresh(this.props.match.params.id))
        } else {
            window.scrollTo(0, this.props.y)
        }

    }


    componentWillUnmount() {
        window.removeEventListener('scroll', this.orderDetailHandleScroll);
        if (this.props.orderDetailLoadingStatus === 2) { // 首屏成功刷出，则备份y
            this.props.dispatch(backupIScrollY(this.scrollTop))
        }
    }
    orderDetailHandleScroll() {
        let scrollTop = this.getScrollTop(); //滚动条滚动高度
        this.scrollTop = scrollTop
    }
    getScrollTop() {
        var scrollTop = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
            scrollTop = document.documentElement.scrollTop;
        } else if (document.body) {
            scrollTop = document.body.scrollTop;
        }
        return scrollTop;
    }

    //search
    beginRefresh() {
        this.props.dispatch(updateOrderDetailLoadingStatus(1)); // 恢复loading界面
        this.props.dispatch(beginRefresh());

    }
    backupIScrollY(e) {
        this.props.dispatch(backupIScrollY(e))
    }

    onRetryLoading() {
        // this.props.dispatch(updateListLoadingStatus(1)); // 恢复loading界面
        // this.props.dispatch(beginRefresh());
    }
    detailData(goods_name, item_price, list_image) {
        window.localStorage.detailData = JSON.stringify({
            'productName': goods_name,
            'productPrice': item_price,
            'productImg': [list_image]
        })
    }

    changeGoods() {
        console.log(this.props.pullDownStatus);
        this.props.dispatch(fetchOrderDetailGoods(this.props.InfoGoodsPage))
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps.match.params.id);
        if (nextProps.match.params.id !== this.props.match.params.id) {
            this.props.dispatch(beginRefresh(nextProps.match.params.id))

        }
    }

    openModal() {

        this.setState({
            modalIsOpen: true
        });
    }
    closeModal() {
        this.setState({
            modalIsOpen: false
        });
    }
    surePay() {
        $.ajax({
            url: '/wap/?g=WapSite&c=Exchange&a=finish_order',
            dataType: 'json',
            type: 'post',
            'data': {
                'order_number': this.props.orderInfoItems.exchange_order_number
            },
            success: (data) => {
                if (data.OK) {
                    this.props.dispatch(beginRefresh(this.props.match.params.id))

                }
            },
            error: () => {

            }
        });
    }
    isurePay() {
        this.setState({
            modalIsOpen: true,
            text: '是否确认收货'
        });
    }
    cancelPay() {
        $.ajax({
            url: '/wap/?g=WapSite&c=Exchange&a=cancel_order',
            dataType: 'json',
            type: 'post',
            'data': {
                'order_number': this.props.orderInfoItems.exchange_order_number
            },
            success: (data) => {
                if (data.OK) {
                    this.props.dispatch(beginRefresh(this.props.match.params.id))

                }
            },
            error: () => {

            }
        });
    }
    isCancel() {
        this.setState({
            modalIsOpen: true,
            text: '是否取订单'
        });
    }
    payPwd() {
        $('#paypwd').show();
        $('.cover-mask').show();
        $('.cover-mask').addClass('cover-mask-toggle').show();

    }

    // <div className="condition">{orderDelivery.delivery.track.info[0].context}</div>
    //                    <div className="time"> {orderDelivery.delivery.track.info[0].time}</div>
    renderPage() {

        let orderInfoItems = this.props.orderInfoItems;
        let orderConsigneeItems = this.props.orderConsigneeItems
        let trackInfoContext = this.props.trackInfoContext
            // console.log(this.propstrackInfoContext.track.info[0].context);
        let emsHtml = [];
        let btnHtml = [];
        console.log(orderInfoItems.cur_status);
        if (orderInfoItems.ems_status == 0) {
            emsHtml = (<div className="mid-cont"><div className="condition">暂无物流信息</div></div>)
        } else {
            emsHtml = (<div className="mid-cont">
                   <div className="condition">{this.props.trackInfoContext}</div>
                        <div className="time"> {this.props.trackInfoTime}</div>
                </div>)

        }



        if (orderInfoItems.cur_status == '待付款') {
            btnHtml = (
                <div>
                    <button className="order-cancel"  onClick={this.cancelPay.bind(this)} >取消订单</button>
                    <button className="pay-btn red-btn" >立即支付</button>   
                    </div>)

        } else if (orderInfoItems.cur_status == '待发货') {
            btnHtml = (
                <button className="pay-btn red-btn" onClick={this.isurePay.bind(this)}>确认收货</button>
            )

        } else if (orderInfoItems.cur_status == '待收货') {
            btnHtml = (
                <div>
                <button className="pay-btn red-btn" >查看物流</button>

                <button className="pay-btn red-btn" >确认收货</button>
                </div>
            )

        }
        return (
            <div>

        <TopNav titleName = "订单详情" />
               <div className='w orderDetWrap'>

<div className="top-board">
                <div className="left-cont">
                    <h3>{orderInfoItems.cur_status}</h3>
                </div>
                <div className="right-icon"></div>
            </div>

<div className="order-msg">
                <div className="bg-icon"></div>
                <div className="right-cont">
                    <div className="user-msg">
                        <div className="user-id">{orderConsigneeItems.consignee}</div>
                        <div className="tel-num">{orderConsigneeItems.mobile}</div>
                    </div>
                    <div className="address">
                        <p>{orderConsigneeItems.province} {orderConsigneeItems.city} {orderConsigneeItems.county}</p>
                        <p>{orderConsigneeItems.address} </p>
                    </div>
                </div>
            </div>

<div className="seller-shipped">
     <div className="bg-icon"></div>
       {emsHtml}
  
 </div>


            <div className="order-details">
                <div className="goods-details">
                    <div className="order-sub">
                        <div className="order-sub-num">子订单号:{orderInfoItems.exchange_order_number}</div>
                    </div>
                    <div className="order-lists">
                        <div className="goods-msg">
                         <div className="icon"><img src="https://img.thgo8.com/assets/images/04/11/list_adf83bb4dc61d76b7ad775a19abd9a7ab366e1f5.jpg" alt=""/></div>
                            <div className="right-cont">
                                <div className="goods-name">{orderInfoItems.goods_name}</div>

                                <div className="norm-wrap">
                                    <div className="norm" style={{float:'left'}}>{orderInfoItems.prop_value}</div>
                                    <div className="amount" style={{float:'right'}}>× 1</div>
                                </div>
                                <div className="price">{orderInfoItems.t_beans}</div>
                            </div>
                        </div>
                                            </div>
                                        <div className="shop-tit" >
                        <div className="title">
                            <i></i>
                                           </div>
                    </div>
                    <ul className="charges">
                        <li className="char-lists">
                            <label htmlFor="">运费：</label>
                            <p className="freight">¥ {orderInfoItems.shipping_cost}</p>
                        </li>
                        <li className="char-lists">
                            <label htmlFor="">借贷券：</label>
                            <p className="loan-vcr">0.00</p>
                        </li>
                        <li className="char-lists">
                            <label htmlFor="">商品优惠：</label>
                            <p className="offers">-¥ 0.00</p>
                        </li>
                        <li className="char-lists">
                            <label htmlFor="">优惠券优惠：</label>
                            <p className="offers">-¥ 0.00</p>
                        </li>
                        <li className="char-lists">
                            <label htmlFor="">红包：</label>
                            <p className="red-elp">-¥ 0.00</p>
                        </li>
                        <li className="char-lists">
                            <label htmlFor="">实付 (含运费)</label>
                            
                            <p className="act-paid">¥  {orderInfoItems.shipping_cost}</p>
                        </li>
                    </ul>
                    <ul className="place-msg">
                        <li className="place-lists">下单时间：{orderInfoItems.pay_time}</li>
                        <li className="place-lists">配送方式：快递运送</li>
                        <li className="place-lists">兑换类型：{orderInfoItems.point_name}</li>
                    </ul>
                </div>
            </div>
<div className="foot">

               
               {btnHtml}
             
</div>


   </div> 
<PayPwd/>
<CoverMask/>
 <Modal isOpen={this.state.modalIsOpen}          // onAfterOpen={this.afterOpenModal}
          // onRequestClose={this.closeModal}
                    style={customStyles}   contentLabel="Example Modal"  >
        <p>{this.state.text}</p>
         <button>取消订单</button>

         <button onClick={this.surePay.bind(this)}>确定收货</button>
         <button onClick={this.payPwd.bind(this)}> 立即支付</button>

        </Modal>
   </div>

        )


    }
    render() {



        let p = new Promise(function(resolve, reject) {});
        let renderHtml = [];
        // 首屏没有加载成功，那么均展示loading效果


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

        orderDetailLoadingStatus: state.MsgOrderDetailReducer.orderDetailLoadingStatus,
        orderDetailGoodsStatus: state.MsgOrderDetailReducer.orderDetailGoodsStatus,
        orderInfoItems: state.MsgOrderDetailReducer.orderInfoItems,
        orderConsigneeItems: state.MsgOrderDetailReducer.orderConsigneeItems,
        trackInfoTime: state.MsgOrderDetailReducer.trackInfoTime,
        trackInfoContext: state.MsgOrderDetailReducer.trackInfoContext,


        y: state.MsgOrderDetailReducer.y


    }
}


export default connect(mapStateToProps)(OrderDetail)
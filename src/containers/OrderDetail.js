import React from 'react';
import {
    connect
} from 'react-redux'
import '../styles/userInfo.scss';
import $ from 'jquery';
import TopNav from '../components/TopNav';

import PayPwd from '../components/isorder/PayPwd';
import Modal from '../components/public/Modal';
import {
    Link
} from 'react-router-dom'


import {

    beginUser,
} from '../actions'
import {
    OrderDetailTryRestoreComponent,
    beginRefresh,
    fetchOrderDetailGoods,
    updateOrderDetailLoadingStatus,
    backupIScrollY
} from '../actions/orderDetail'

class OrderDetail extends React.Component {
    constructor(props) {
        super(props);
        this.scrollTop = 0;
        this.state = {
            ModalIicon: ''
        }
        this.orderDetailHandleScroll = this.orderDetailHandleScroll.bind(this);
    };

    componentWillMount() {
        document.title = '订单详情'
        window.scrollTo(0, 0)
        let p = new Promise(function(resolve, reject) {});

        if (window.localStorage.user_info != 1) {
            // 转换数字
            p.then(this.props.history.push(this.props.baseUrl + '/login/orderDetail/'))
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


    detailData(goods_name, exchange_points, item_price, list_image) {
        window.localStorage.detailData = JSON.stringify({
            'productName': goods_name,
            'productPoints': exchange_points,
            'productPrice': item_price,
            'productImg': [list_image]
        })
    }

    changeGoods() {
        this.props.dispatch(fetchOrderDetailGoods(this.props.match.params.id))
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.id !== this.props.match.params.id) {
            this.props.dispatch(beginRefresh(nextProps.match.params.id))
        }
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
    orderPayBtn() {

        this.refs.Modal.setText('确定已收到货吗?')
        this.refs.Modal.handleOpenModal()
    }
    ModalCallBack() {
        this.fecthPay()
        this.refs.Modal.handleOpenModal3();
        this.refs.Modal.handleCloseModal()
    }
    fecthPay() {

        $.ajax({
            url: '/wap/?g=WapSite&c=Exchange&a=finish_order',
            dataType: 'json',
            type: 'post',
            'data': {
                'order_number': this.props.match.params.id
            },
            success: (data) => {
                this.refs.Modal.handleCloseModal3();
                this.refs.Modal.handleOpenModal2()
                if (data.OK) {
                    this.refs.Modal.setText2('收货成功')
                    this.setState({
                        ModalIicon: 1
                    })
                    this.changeGoods();


                } else {
                    this.setState({
                        ModalIicon: 0
                    })
                    this.refs.Modal.setText2(data.error)
                }
            },
            error: () => {
                console.log('加载失败')
            }
        });
    }

    renderPage() {

        let orderInfoItems = this.props.orderInfoItems;
        let orderConsigneeItems = this.props.orderConsigneeItems
        let trackInfoContext = this.props.trackInfoContext
        let trackInfoTime = this.props.trackInfoTime
        let emsHtml = [];
        let btnHtml = [];

        if (orderInfoItems.ems_status == 1 && trackInfoContext.length > 0) {
            //转换类型
            emsHtml = (<div className="mid-cont">
                   <div className="condition">{this.props.trackInfoContext}</div>
                        <div className="time"> {this.props.trackInfoTime}</div>
                </div>)

        } else {
            emsHtml = (<div className="mid-cont"><div className="condition">暂无物流信息</div></div>)
        }



        if (orderInfoItems.cur_status === '待付款') {
            btnHtml = (
                <div>
                   
                    </div>)

        } else if (orderInfoItems.cur_status === '待收货') {
            btnHtml = (
                <div className="foot">
                <button className="pay-btn red-btn" onClick={this.orderPayBtn.bind(this)}>确认收货</button>
                </div>
            )

        }
        let priceHtml = ''
        let item_price = parseFloat(orderInfoItems.total_price)
        if (item_price !== 0) {
            priceHtml = (<span className='totalPrice'><span className='add'>+</span><em className='money'>¥</em>{orderInfoItems.total_price}</span>)
        } else {
            priceHtml = (<span></span>)

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

<div className= {trackInfoContext.length>0?'seller-shipped':'seller-shipped gray56'}>
<Link className='' to={this.props.baseUrl+'/TranList/'+orderInfoItems.exchange_order_number}>
     <div className="bg-icon"></div>
       {emsHtml}
  </Link>
 </div>


            <div className="order-details">
                <div className="goods-details">
                    <div className="order-sub">
                        <div className="order-sub-num"  >子订单号:{orderInfoItems.exchange_order_number}</div>
                    </div>
                    <Link to={this.props.baseUrl+'/product/'+orderInfoItems.item_id} onClick={this.detailData.bind(this, orderInfoItems.goods_name,orderInfoItems.t_beans,orderInfoItems.price, orderInfoItems.goods_image)}>
                    <div className="order-lists">
                        <div className="goods-msg">
                         <div className="icon"><img src={orderInfoItems.goods_image}/></div>
                            <div className="right-cont">
                                <div className="goods-name">{orderInfoItems.goods_name}</div>

                                <div className="norm-wrap">
                                    <div className="norm" style={{float:'left'}}>{orderInfoItems.prop_value}</div>
                                    <div className="amount" style={{float:'right'}}>× 1</div>
                                </div>

        <div className="price">
<span className="e-price"><em className='moneyPrice'>  {orderInfoItems.t_beans}</em>积分</span>
      {priceHtml}</div>
                            </div>
                        </div>
                                            </div>
</Link>
                                        <div className="shop-tit" >
                        <div className="title">
                            <i></i>
                                           </div>
                    </div>
                    <ul className="charges">
                        <li className="char-lists">
                            <label htmlFor="">运费：</label>
                            <p className="freight">+¥ {orderInfoItems.shipping_cost}</p>
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
                            
        <p className="act-paid">¥ {(parseFloat(orderInfoItems.shipping_cost?orderInfoItems.shipping_cost:0)+parseFloat(orderInfoItems.total_price?orderInfoItems.total_price:0)).toFixed(2)}</p>
                        </li>
                    </ul>
                    <ul className="place-msg">
                        <li className="place-lists">下单时间：{orderInfoItems.created}</li>
                        <li className="place-lists">配送方式：快递运送</li>
                        <li className="place-lists">兑换类型：{orderInfoItems.point_name}</li>
                    </ul>
                </div>
            </div>
               {btnHtml}
   </div> 
<PayPwd/>
      <Modal ref='Modal'  icon={this.state.ModalIicon}  ModalCallBack={this.ModalCallBack.bind(this)}/>
   </div>
        )
    }
    render() {
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
        baseUrl: state.MsgAppReducer.baseUrl,
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
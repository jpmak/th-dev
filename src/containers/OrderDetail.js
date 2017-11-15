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
    beginShare
} from '../actions/wxchat'
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
        this.props.dispatch(beginShare('orderdetail', this.props.match.params.id))
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
    renderloading() {
        return (
            <div>

        <TopNav titleName = "订单详情" />
               <div className='w orderDetWrap loading'>
<div className="top-board">
            </div>

<div className="order-msg">
                <div className="bg-icon"></div>
                <div className="right-cont">
                    <div className="user-msg">
                        <div className="user-id"></div>
                        <div className="tel-num"></div>
                    </div>
                    <div className="address">
                        <p></p>
                        <p></p>
                    </div>
                </div>

            </div>
<div class="seller-shipped gray56"><div class="bg-icon"></div><div class="mid-cont"><div class="condition"></div></div></div>
<div>

     <div className="bg-icon"></div>


 </div>


            <div className="order-details">
                <div className="goods-details">
                    <div className="order-sub">
                        <div className="order-sub-num"><span>订单号:</span><em></em></div>
                    </div>
              
                    <div className="order-lists">
                        <div className="goods-msg">
                         <div className="icon"></div>
                            <div className="right-cont">
                                <div className="goods-name"></div>

                                <div className="norm-wrap">
                                    <div className="norm" style={{float:'left'}}></div>
    
                                </div>

        <div className="price">
<span className="e-price"></span>
      </div>
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
        <p className="freight"></p>
                        </li>
                     
                        <li className="char-lists">
                            <label htmlFor="">实付 (含运费)</label>
                            
        <p className="act-paid"><span className="e-price"></span>
    </p>
                        </li>
                    </ul>
                    <ul className="place-msg">
                        <li className="place-lists">下单时间：<em></em></li>
                        <li className="place-lists">配送方式：<em></em></li>
                        <li className="place-lists">兑换类型：<em></em></li>
                        <li className="place-lists">付款方式：<em></em></li>

                    </ul>
                </div>
            </div>
             
   </div> 
<PayPwd/>
      <Modal ref='Modal'  icon={this.state.ModalIicon}  ModalCallBack={this.ModalCallBack.bind(this)}/>
   </div>
        )
    }
    renderPage() {

        let orderInfoItems = this.props.orderInfoItems;
        let orderConsigneeItems = this.props.orderConsigneeItems
        let trackInfoContext = this.props.trackInfoContext
        let trackInfoTime = this.props.trackInfoTime
        let emsHtml = [];
        let btnHtml = [];
        let iconHtml = [];
        let cur_statusHtml = [];


        if (orderInfoItems.ems_status == 1 && trackInfoContext.length > 0) {
            //转换类型
            emsHtml = (<div className="mid-cont open">
                   <div className="condition">{this.props.trackInfoContext}</div>
                        <div className="time"> {this.props.trackInfoTime}</div>
                </div>)

        } else {
            emsHtml = (<div className="mid-cont open"><div className="condition">暂无物流信息</div></div>)
        }

        switch (orderInfoItems.cur_status) {
            case '待发货':
                cur_statusHtml = (<h3>正在出库</h3>)
                iconHtml = (<div className="right-icon wait"></div>)
                break;
            case '待收货':
                cur_statusHtml = (<h3>卖家已发货</h3>)
                iconHtml = (<div className="right-icon car"></div>)
                btnHtml = (
                    <div className="foot">
                 <Link to={this.props.baseUrl+'/TranList/'+orderInfoItems.exchange_order_number}>
                <button className="pay-btn">查看物流</button>
               </Link>

                <button className="pay-btn red-btn" onClick={this.orderPayBtn.bind(this)}>确认收货</button>
                </div>
                )
                break;

            default:
                cur_statusHtml = (<h3>{orderInfoItems.cur_status}</h3>)
                iconHtml = (<div className="right-icon"></div>)
                btnHtml = (
                    <div>
                </div>
                )

        }
        let priceHtml = ''
        let item_price = parseFloat(orderInfoItems.total_price)
        if (item_price !== 0) {
            priceHtml = (<span className='totalPrice open'><span className='add'>+</span><em className='money'>{orderInfoItems.total_price}</em>元</span>)
        } else {
            priceHtml = (<span></span>)

        }

        return (
            <div>

        <TopNav titleName = "订单详情" />
               <div className='w orderDetWrap '>

<div className="top-board">
                <div className="left-cont">
       {cur_statusHtml}
                </div>
                {iconHtml}
         
            </div>

<div className="order-msg">
                <div className="bg-icon"></div>
                <div className="right-cont">
                    <div className="user-msg">
        <div className="user-id open">{orderConsigneeItems.consignee}</div>
                        <div className="tel-num open">{orderConsigneeItems.mobile}</div>
                    </div>
                    <div className="address">
                        <p className='open'>{orderConsigneeItems.province} {orderConsigneeItems.city} {orderConsigneeItems.county}</p>
                        <p className='open'>{orderConsigneeItems.address} </p>
                    </div>
                </div>
            </div>

<div className= {trackInfoContext.length>0?'seller-shipped':'seller-shipped gray56 '}>
<Link  to={this.props.baseUrl+'/TranList/'+orderInfoItems.exchange_order_number}>
     <div className="bg-icon open"></div>
       {emsHtml}
  </Link>
 </div>


            <div className="order-details">
                <div className="goods-details">
                    <div className="order-sub">
                        <div className="order-sub-num"  >订单号:{orderInfoItems.exchange_order_number}</div>
                    </div>
                    <Link to={this.props.baseUrl+'/product/'+orderInfoItems.item_id} onClick={this.detailData.bind(this, orderInfoItems.goods_name,orderInfoItems.t_beans,orderInfoItems.price, orderInfoItems.goods_image)}>
                    <div className="order-lists">
                        <div className="goods-msg">
                         <div className="icon"><img className='open' src={orderInfoItems.goods_image}/></div>
                            <div className="right-cont">
                                <div className="goods-name open">{orderInfoItems.goods_name}</div>

                                <div className="norm-wrap">
                                    <div className="norm open" style={{float:'left'}}>{orderInfoItems.prop_value}</div>
    
                                </div>

        <div className="price">
<span className="e-price open"><em className='moneyPrice'>  {orderInfoItems.t_beans}</em>积分</span>
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
        <p className="freight open">¥ {orderInfoItems.shipping_cost}</p>
                        </li>
                     
                        <li className="char-lists">
                            <label htmlFor="">实付 (含运费)</label>
                            
        <p className="act-paid  open"><span className="e-price"><em className='moneyPrice'>  {orderInfoItems.t_beans}</em>积分</span>
      {priceHtml}</p>
                        </li>
                    </ul>
                    <ul className="place-msg">
                        <li className="place-lists">下单时间：<em className='open'>{orderInfoItems.created}</em></li>
                        <li className="place-lists">配送方式：<em className='open'>快递运送</em></li>
                        <li className="place-lists">兑换类型：<em className='open'>{orderInfoItems.point_name}</em></li>
                        <li className="place-lists">付款方式：<em className='open'>惠积分</em></li>

                    </ul>
                </div>
            </div>
       
   </div> 
<PayPwd/>
      <Modal ref='Modal'  icon={this.state.ModalIicon}  ModalCallBack={this.ModalCallBack.bind(this)}/>
   </div>
        )
    }
    render() {
        let renderHtml = [];

        // console.log(this.props.orderInfoItems);
        if (this.props.orderInfoItems.length == 0) {
            console.log('test');
            renderHtml = this.renderloading()
        } else {
            renderHtml = this.renderPage();
        }
        // 首屏没有加载成功，那么均展示loading效果

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
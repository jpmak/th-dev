import React from 'react';
import {
    connect
} from 'react-redux'
import '../styles/userInfo.scss';

import $ from 'jquery';

import TopNav from '../components/TopNav';
import Goback from '../components/public/Goback';
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

class OrderDetail extends React.Component {
    constructor(props) {
        super(props);
        this.scrollTop = 0;
        this.orderDetailHandleScroll = this.orderDetailHandleScroll.bind(this);
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
        // window.addEventListener('scroll', this.orderDetailHandleScroll);
        // if (this.props.homeLoadingStatus === 1 || this.props.userStatus === 0) {
        //     this.props.dispatch(beginUser())
        //     this.props.dispatch(beginRefresh())
        // } else {
        //     window.scrollTo(0, this.props.y)
        // }

    }


    componentWillUnmount() {
        window.removeEventListener('scroll', this.orderDetailHandleScroll);
        if (this.props.homeLoadingStatus === 2) { // 首屏成功刷出，则备份y
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

    renderPage() {
        return (
            <div>
        <TopNav titleName = "订单详情" />
               <div className='w orderDetWrap'>

<div className="top-board">
                <div className="left-cont">
                    <h3>待付款</h3>
                </div>
                <div className="right-icon"></div>
            </div>

<div className="order-msg">
                <div className="bg-icon"></div>
                <div className="right-cont">
                    <div className="user-msg">
                        <div className="user-id">test</div>
                        <div className="tel-num">13700137000</div>
                    </div>
                    <div className="address">
                        <p>西藏 拉萨市 城关区</p>
                        <p>test11111</p>
                    </div>
                </div>
            </div>

<div className="seller-shipped">
                <div className="bg-icon"></div>
                <div className="mid-cont">
                    <div className="condition">卖家发货</div>
                    <div className="time">2017-09-14 17:40:52</div>
                </div>
            </div>


            <div className="order-details">
                <div className="goods-details">
                    <div className="order-sub">
                        <div className="order-sub-num">子订单号:170923152229828091</div>
                        <div className="shop-name">通惠自营店</div>
                    </div>
                                        <div className="order-lists">
                        <div className="goods-msg">
                         <div className="icon"><img src="https://img.thgo8.com/assets/images/04/11/list_adf83bb4dc61d76b7ad775a19abd9a7ab366e1f5.jpg" alt=""/></div>
                            <div className="right-cont">
                                <div className="goods-name">【门店自提】海天 水果醋果汁酿造调味醋 苹果醋(拉环盖)450ml</div>
                                <div className="norm-wrap">
                                    <div className="norm"></div>
                                    <div className="amount">× 1</div>
                                </div>
                                <div className="price">¥ 6.50</div>
                            </div>
                        </div>
                                            </div>
                                        <div className="shop-tit" onclick="location='Store-home-1.html'">
                        <div className="title">
                            <i></i>
                            通惠自营店                       </div>
                    </div>
                    <ul className="charges">
                        <li className="char-lists">
                            <label for="">运费：</label>
                            <p className="freight">¥ 20.00</p>
                        </li>
                        <li className="char-lists">
                            <label for="">借贷券：</label>
                            <p className="loan-vcr">0.00</p>
                        </li>
                        <li className="char-lists">
                            <label for="">商品优惠：</label>
                            <p className="offers">-¥ 0.00</p>
                        </li>
                        <li className="char-lists">
                            <label for="">优惠券优惠：</label>
                            <p className="offers">-¥ 0.00</p>
                        </li>
                        <li className="char-lists">
                            <label for="">红包：</label>
                            <p className="red-elp">-¥ 0.00</p>
                        </li>
                        <li className="char-lists">
                            <label for="">实付 (含运费)</label>
                            <p className="act-paid">¥ 26.50</p>
                        </li>
                    </ul>
                    <ul className="place-msg">
                        <li className="place-lists">下单时间：2017-09-23 15:22:29</li>
                        <li className="place-lists">配送方式：快递运送</li>
                        <li className="place-lists">付款方式：未支付</li>
                        <li className="place-lists">获得购物积分：0</li>
                    </ul>
                </div>
            </div>

<div className="foot">
               <button className="order-cancel" >取消订单</button>
               <button className="pay-btn red-btn" >立即支付</button>
    </div>


   </div>

</div>)


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



class Info extends React.Component {
    render() {
        let userMoney = this.props.userMoney ? this.props.userMoney : '0';
        let userTourism = this.props.userTourism ? this.props.userTourism : '0';
        let userBuy = this.props.userBuy ? this.props.userBuy : '0';
        return (
            <div className='info-watch'>
               <ul>
          <li>
                          <p className='num'>{userMoney}</p>
                                <p>可用积分排点</p>
          </li>
                <li>
                          <p className='num'>{userTourism} </p>
                                <p>可用旅游积分</p>
          </li>
                <li>
                          <p className='num'>{userBuy}</p>
                                <p>可用购物积分</p>
          </li>
               </ul>
               </div>
        )
    }
}



const mapStateToProps = state => {
    return {

        userStatus: state.MsgAppReducer.userStatus,

        orderDetailLoadingStatus: state.MsgOrderDetailReducer.orderDetailLoadingStatus,
        orderDetailGoodsStatus: state.MsgOrderDetailReducer.orderDetailGoodsStatus,
        orderDetailGoodsItems: state.MsgOrderDetailReducer.orderDetailGoodsItems,
        y: state.MsgOrderDetailReducer.y


    }
}


export default connect(mapStateToProps)(OrderDetail)
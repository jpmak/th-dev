import React from 'react';
import LazyLoad from 'react-lazyload';
import $ from 'jquery';
import LoadingLayer from '../../components/LoadingLayer/LoadingLayer';

import PlaceholderComponent from './../public/Placeholder';

import {
    Link
} from 'react-router-dom'
class AllOrderGoods extends React.Component {
    constructor(props) {
        super(props);
        this.pullUpTips = {
            // 上拉状态
            0: '<i class="r-gif"></i>正在加载',
            1: '加载失败',
            2: ''
        };
        this.pullDownTips = {
            // 上拉状态
            0: '<i class="r-gif"></i>正在加载',
            1: '没有更多数据了 ',
            2: '已经到底了,别址了',
            3: '加载失败',
            4: ''
        };
        this.isDataing = false;
        this.scrollTop = 0;
        this.allOrderHandleScroll = this.allOrderHandleScroll.bind(this);

    };
    //     render() {
    //         return (
    //             <div className='w'>
    // <div className='infoTitle'>
    // 我可兑换
    // </div>
    //         <div className=''></div>
    //         </div>
    //         )
    //         
    componentDidMount() {
        window.addEventListener('scroll', this.allOrderHandleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.allOrderhandleScroll);

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
    getClientHeight() {
        var windowHeight = 0;
        if (document.compatMode == "CSS1Compat") {
            windowHeight = document.documentElement.clientHeight;
        } else {
            windowHeight = document.body.clientHeight;
        }
        return windowHeight;
    }
    getScrollHeight() {
        var scrollHeight = 0,
            bodyScrollHeight = 0,
            documentScrollHeight = 0;
        if (document.body) {
            bodyScrollHeight = document.body.scrollHeight;
        }
        if (document.documentElement) {
            documentScrollHeight = document.documentElement.scrollHeight;
        }
        scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
        return scrollHeight;
    }

    allOrderHandleScroll() {
        let bodyBox = document.getElementById('root')
        let clientHeight = this.getClientHeight(); //可视区域高度
        let scrollTop = this.getScrollTop(); //滚动条滚动高度
        let scrollHeight = this.getScrollHeight(); //滚动内容高度
        if ((clientHeight + scrollTop) == (scrollHeight) && this.props.allOrderGoodsStatus !== 0 && this.isDataing === false) {
            this.isDataing = true;

            this.props.changeGoods()


        }
        this.scrollTop = scrollTop
        this.props.backupIScrollY(this.scrollTop)
            // console.log(this.scrollTop);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.allOrderList !== this.props.allOrderList) {
            this.isDataing = false;
        }
    }
    onRetryLoading() {
        this.props.beginRefresh();
    }
    handleClick(goods_name, item_price, list_image) {
        this.props.detailData(goods_name, item_price, list_image)
    }

    renderLoading() {
        let outerStyle = {
            height: window.innerHeight / 2
        };
        return (
            <div>
                <LoadingLayer outerStyle={outerStyle} onRetry={this.onRetryLoading.bind(this)}
                    loadingStatus={this.props.allOrderLoadingStatus}
                />
            </div>
        );
    }

    // <li key = {index} onClick = {this.handleClick.bind(this, allOrderGood.goods_name, allOrderGood.item_price, allOrderGood.list_image)}
    //           className = {this.changeGoods ? 'add' : 'move'} >
    //           <Link to={'/Exchange-index.html/product/'+LogGood.item_id}  className="upItem " data-id={LogGood.item_id}>
    //       <div className="info-img">
    //       <LazyLoad  placeholder={<PlaceholderComponent />}>
    //       <img  src={LogGood.list_image}/>
    //       </LazyLoad>
    //       </div>
    //       <div className="info-bar">
    //       <div className="pro-title">{LogGood.goods_name}</div>
    //       <div className="e-numb">
    //       <span className="e-price"><em>{LogGood.item_price}</em>积分</span>
    //       </div>
    //       </div>
    //       </Link> </li>
    renderPage() {
        let bodyBox = document.getElementById('root')
        let allOrderGoodList = [];
        let shopCostHtml = []
        let allOrderGoods = this.props.allOrderList ? this.props.allOrderList : '';
        if (allOrderGoods != '') {
            allOrderGoodList = allOrderGoods.map((allOrderGood, index) => {
                if (allOrderGood.shipping_cost == '0.00') {
                    shopCostHtml = (<span className='serve'>免服务费</span>)
                } else {
                    shopCostHtml = (<span><span className='serve'>服务费</span><span className='num'>¥</span><span className='num'>{allOrderGood.shipping_cost}</span></span>)


                }
                return (
                    <li key={index}>
                    <Link to={'/Exchange-index.html/orderdetail/'+allOrderGood.exchange_order_number} className='upItem' >

<div className='order'>
<div className='orderNum'><span>订单号：</span><span>{allOrderGood.exchange_order_number}</span>
</div>
<div className='orderState'><span>{allOrderGood.cur_state} </span></div>
</div>

   <div className="info-img"><img alt="" className="lazy" src={allOrderGood.goods_image}/>{/*</LazyLoad>*/}</div>
   <div className="info-bar">
   <div className="pro-title">{allOrderGood.goods_name}</div>
   <div className="e-numb"><span className="e-price"><em>{allOrderGood.t_beans}</em>积分</span>
   <span className="orderPrice">X1</span>
   </div>
   </div>
   
   <div className='totalWrap'>
   <div className='orderTotal'>
<div className='total'><span>总计</span> <span className='num'>{allOrderGood.t_beans}</span><span className='num'>积分</span><i className='add'>+</i> {shopCostHtml}</div>
   </div>
   <div className='orderBtn'></div>
   </div>
   </Link>     
    </li>
                )
            }, this)
        } else if (this.props.allOrderGoodsPage == 1 && allOrderGoods.length == 0) {

            allOrderGoodList = (<div className="none-data"></div>);
        }

        return (

            <div className="app-pd-wp"  style={{paddingBottom:'0'}}>
                    <p ref="PullUp" id="PullUp" dangerouslySetInnerHTML={{__html:this.pullUpTips[this.props.pullUpStatus]}} />
                <div className="app-pd-list hor-list order">
                   <ul >
     
                {allOrderGoodList}
                   </ul>
                    </div>
              <p ref="PullDown" id="PullDown" dangerouslySetInnerHTML={{__html:this.pullDownTips[this.props.pullDownStatus]}} />
                    </div>
        )
    }


    render() {
        // console.log(this.props.allOrderGoodsPage);
        let renderHtml = [];
        if (this.props.allOrderLoadingStatus !== 2) {
            renderHtml = this.renderLoading();
        } else {

            renderHtml = this.renderPage();

        }
        return (
            <div>
               {renderHtml} 
            </div>

        )
    }


}

export default AllOrderGoods;
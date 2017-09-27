import React from 'react';
import LazyLoad from 'react-lazyload';
import $ from 'jquery';
import LoadingLayer from '../../components/LoadingLayer/LoadingLayer';

import PlaceholderComponent from './../public/Placeholder';

import {
    Link
} from 'react-router-dom'
class LogGoods extends React.Component {
    constructor(props) {
        super(props);
        this.pullDownTips = {
            // 上拉状态
            0: '<i class="r-gif"></i>正在加载',
            1: '没有更多数据了 ',
            2: '已经到底了,别址了',
            3: '加载失败',
            4: ''
        };
        this.isDataing = false;
        this.homehandleScroll = this.homehandleScroll.bind(this);

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
        window.addEventListener('scroll', this.homehandleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.homehandleScroll);
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

    homehandleScroll() {


        let bodyBox = document.getElementById('root')
        let clientHeight = this.getClientHeight(); //可视区域高度
        let scrollTop = this.getScrollTop(); //滚动条滚动高度
        let scrollHeight = this.getScrollHeight(); //滚动内容高度
        if ((clientHeight + scrollTop) == (scrollHeight) && this.props.LogGoodsStatus !== 0 && this.isDataing === false) {
            console.log(11)
            this.isDataing = true;
            setTimeout(this.props.changeGoods(), 100)


        }


    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.LogGoods !== this.props.LogGoods) {
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
                    loadingStatus={this.props.logLoadingStatus}
                />
            </div>
        );
    }

    // <li key = {index} onClick = {this.handleClick.bind(this, LogGood.goods_name, LogGood.item_price, LogGood.list_image)}
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
        let LogGoodList = [];
        let LogGoods = this.props.logList ? this.props.logList : '';
        if (LogGoods != '') {
            LogGoodList = LogGoods.map((LogGood, index) => {
                return (
                    <li key={index}><Link to={'/Exchange-index.html/product/'+LogGood.item_id} className='upItem' data-id={LogGood.user_id}>

<div className='order'>
<div className='orderNum'><span>订单号：</span><span>{LogGood.exchange_order_number}</span></div>
<div className='orderdate'><span>{LogGood.created}</span></div>
</div>

   <div className="info-img"><img alt="" className="lazy" src={LogGood.goods_image}/>{/*</LazyLoad>*/}</div><div className="info-bar"><div className="pro-title">{LogGood.prop_value}</div><div className="e-numb"><span className="e-price"><em>{LogGood.t_beans}</em>积分</span></div></div></Link>      </li>



                )
            }, this)
        } else if (this.props.logGoodsPage == 0 && LogGoods == 0) {
            LogGoodList = (<div className="none-data"></div>);
        }

        return (

            <div className="app-pd-wp"  style={{paddingBottom:'0'}}>
                <div className="app-pd-list hor-list order">
                   <ul >
     
                {LogGoodList}
                   </ul>
                    </div>
              <p ref="PullDown" id="PullDown" dangerouslySetInnerHTML={{__html:this.pullDownTips[this.props.pullDownStatus]}} />
                    </div>
        )
    }


    render() {
        console.log(this.props.logGoodsPage);
        let renderHtml = [];
        if (this.props.logLoadingStatus !== 2) {
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

export default LogGoods;
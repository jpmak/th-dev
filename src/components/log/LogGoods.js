import React from 'react';
import LazyLoad from 'react-lazyload';
import $ from 'jquery';
import LoadingLayer from '../../components/LoadingLayer/LoadingLayer';
import DataNone from '../../components/public/DataNone';

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

    };


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

    history() {
        this.props.history()
    }
    renderPage() {
        let bodyBox = document.getElementById('root')
        let LogGoodList = [];
        let LogGoods = this.props.logList ? this.props.logList : '';
        if (LogGoods != '') {
            LogGoodList = LogGoods.map((LogGood, index) => {
                let valueHtml = '';
                if (LogGood.prop_value) {
                    valueHtml = (<div className="prop_value-title"><span>颜色分类：{LogGood.prop_value}</span></div>)
                } else {
                    valueHtml = ('');
                }
                let item_price = parseFloat(LogGood.total_price)
                let priceHtml = '';
                if (item_price !== 0) {
                    priceHtml = (<span className='point'><span className='add'>+</span><em className='money'>¥</em>{LogGood.total_price}</span>)
                } else {
                    priceHtml = (<span></span>)

                }
                let shopCostHtml = '';
                if (LogGood.shipping_cost == '0.00') {
                    shopCostHtml = (<span className='serve'><span className='add'>+</span>免运费</span>)
                } else {
                    shopCostHtml = (<span  className='serve'><span className='add'>+</span><span className='serve'>运费</span><span className='num'>¥</span><span className='num'>{LogGood.shipping_cost}</span></span>)
                }
                return (
                    <li key={index}>
                    <Link to={this.props.baseUrl+'/orderdetail/'+LogGood.exchange_order_number} className='upItem' data-id={LogGood.user_id}>

<div className='order'>
<div className='orderNum'><span>订单号：</span><span>{LogGood.exchange_order_number}</span></div>
<div className='orderdate'><span>{LogGood.created}</span></div>
</div>

   <div className="info-img">
       <LazyLoad  placeholder={<PlaceholderComponent />}><img alt="" className="lazy" src={LogGood.goods_image}/></LazyLoad></div><div className="info-bar"><div className="pro-title">{LogGood.goods_name}</div>
                {
                    valueHtml
                }
                <div className="e-numb"><span className="e-price"><em className='moneyPrice'>{LogGood.t_beans}</em>积分</span>{priceHtml}{shopCostHtml}</div> </div></Link> </li>
                )
            }, this)
        } else if (this.props.logGoodsPage == 0 && LogGoods == 0) {
            LogGoodList = <DataNone/>;
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
        let renderHtml = [];
        if (this.props.logLoadingStatus !== 2 && this.props.userStatus === 1) {
            renderHtml = this.renderLoading();
        } else if (this.props.logLoadingStatus === 3 && this.props.userStatus === 0) {
            renderHtml = this.history();
            //跳去跳转页面
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
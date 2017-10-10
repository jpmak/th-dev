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

   <div className="info-img">
       <LazyLoad  placeholder={<PlaceholderComponent />}><img alt="" className="lazy" src={LogGood.goods_image}/></LazyLoad></div><div className="info-bar"><div className="pro-title">{LogGood.prop_value}</div><div className="e-numb"><span className="e-price"><em>{LogGood.t_beans}</em>积分</span></div></div></Link>      </li>



                )
            }, this)
        } else if (this.props.logGoodsPage == 0 && LogGoods == 0) {
            LogGoodList =<DataNone/>;
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
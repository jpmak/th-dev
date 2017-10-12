import React from 'react';
import LazyLoad from 'react-lazyload';
import $ from 'jquery';
import LoadingLayer from '../../components/LoadingLayer/LoadingLayer';

import PlaceholderComponent from './../public/Placeholder';

import {
    Link
} from 'react-router-dom'
class InfoGoods extends React.Component {
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
        if ((clientHeight + scrollTop) == (scrollHeight) && this.props.InfoGoodsStatus !== 0 && this.isDataing === false) {
            console.log(11)
            this.isDataing = true;
            setTimeout(this.props.changeGoods(), 100)


        }


    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.InfoGoods !== this.props.InfoGoods) {
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
                    loadingStatus={this.props.homeLoadingStatus}
                />
            </div>
        );
    }


    renderPage() {
        let bodyBox = document.getElementById('root')
        let InfoGoodList = [];
        let InfoGoods = this.props.InfoGoods;
        if (InfoGoods != '') {
            InfoGoodList = InfoGoods.map((InfoGood, index) => {
                let item_price = parseFloat(InfoGood.item_price)
                let priceHtml = '';
                if (item_price !== 0) {
                    priceHtml = (<span className='point'><span className='add'>+</span><em className='money'>¥</em>{InfoGood.item_price}</span>)
                } else {
                    priceHtml = (<span></span>)

                }
                return (
                    <li key = {index} onClick = {this.handleClick.bind(this, InfoGood.goods_name, InfoGood.item_price, InfoGood.list_image)}
                    className = {this.changeGoods ? 'add' : 'move'} >
                    <Link to={'/Exchange-index.html/product/'+InfoGood.item_id}  className="upItem " data-id={InfoGood.item_id}>
                <div className="info-img">
                <LazyLoad  placeholder={<PlaceholderComponent />}>
                <img  src={InfoGood.list_image}/>
                </LazyLoad>
                </div>
                <div className="info-bar">
                <div className="pro-title">{InfoGood.goods_name}</div>
                <div className="e-numb">
                <span className="e-price"><em>{InfoGood.exchange_points?InfoGood.exchange_points:0}</em>积分</span>
                {
                    priceHtml
                }
                </div>
                </div>
                </Link> </li>
                )
            }, this)
        } else if (this.props.InfoGoodsPage == 1 && InfoGoods == 0) {
            InfoGoodList = (<div className="none-data"></div>);
        }

        return (

            <div className="app-pd-wp"  style={{background:'#fff',paddingBottom:'0'}}>
                <div className="app-pd-list">
                   <ul >
                {InfoGoodList}
                   </ul>
                    </div>
              <p ref="PullDown" id="PullDown" dangerouslySetInnerHTML={{__html:this.pullDownTips[this.props.pullDownStatus]}} />
                    </div>
        )
    }


    render() {

        let renderHtml = [];
        if (this.props.homeLoadingStatus !== 2) {
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

export default InfoGoods;
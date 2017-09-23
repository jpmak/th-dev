import React from 'react';
import LazyLoad from 'react-lazyload';
import $ from 'jquery';
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
        if ((clientHeight + scrollTop) == (scrollHeight) && this.props.InfoGoodsStatus !== 0) {
            this.props.changeGoods();
        }


    }


    handleClick(goods_name, item_price, list_image) {
        this.props.detailData(goods_name, item_price, list_image)
    }
    renderPage() {
        let bodyBox = document.getElementById('root')
        let InfoGoodList = [];
        let InfoGoods = this.props.InfoGoods;
        if (InfoGoods != '') {
            InfoGoodList = InfoGoods.map((InfoGood, index) => {
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
                <span className="e-price"><em>{InfoGood.item_price}</em>积分</span>
                </div>
                </div>
                </Link> </li>
                )
            }, this)
        }
        // else if (this.props.pageStatus == 0 && CateGoods == 0) {
        //     CateGoodList = (<div className="none-data"></div>);
        // }

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
        console.log(this.props.InfoGoods);
        return this.renderPage()
    }


}

export default InfoGoods;
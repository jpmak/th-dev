import React from 'react';
import $ from 'jquery';
import LazyLoad from 'react-lazyload';
import PlaceholderComponent from './public/Placeholder';
import DataNone from '../components/public/DataNone';

import {
    Link
} from 'react-router-dom'
// let goodsList = this.state.goodsList;
class CateGoods extends React.Component {
    constructor(props) {
        super(props);
        this.touchRange = 0 // 触控距离
        this.touchLeft = 0;
        this.onClick = false;
        this.scrollTop = 0;
        this.changeGoods = true;
        this.isDataing = false;
        // this.scrollFixed = false;
        this.handleScroll = this.handleScroll.bind(this)
        this.state = {
            move: 0,
            currentIndex: 0,
            liWidth: 0,
            wrapWidth: 0,
            onStartX: 0,
            onMoveX: 0,
            changeGoods: 1,
            scrollFixed: 0
        };
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
    };

    handleScroll(scrollTop) {
        let scrollwrap = document.getElementById('scrollwrap').offsetHeight


        if (scrollTop > scrollwrap) {
            this.setState({
                scrollFixed: 1
            });
            $('#app-scroller').css({
                'position': 'fixed',
                'top': '0'
            })
        } else {
            this.setState({
                scrollFixed: 0
            });
            $('#app-scroller').css({
                'position': 'relative',
            })
        }



    }

    changeLi() {
        let promise = new Promise(function(resolve, rejeact) {
            resolve();
        });
        promise.then(() => {
            this.changeGoods = false
        }).then(() => {
            this.changeGoods = true
        })
    }
    handleClick(goods_name, exchange_points, item_price, list_image) {
        this.props.detailData(goods_name, exchange_points, item_price, list_image)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.cateGoods !== this.props.cateGoods) {
            this.props.changeIsData(false);
        }
    }
    renderPage() {

        let CateGoodList = [];
        let CateGoods = this.props.cateGoods;
        if (CateGoods.length > 0) {
            CateGoodList = CateGoods.map((CateGood, index) => {
                let item_price = parseFloat(CateGood.item_price)
                let pointsHtml = '';
                if (item_price !== 0) {
                    pointsHtml = (<span className='point'><span className='add'>+</span><em className='money'>¥</em>{CateGood.item_price}</span>)
                } else {
                    pointsHtml = (<span></span>)
                }
                return (
                    <li  key={index} onClick={this.handleClick.bind(this,CateGood.goods_name,CateGood.exchange_points,CateGood.item_price,CateGood.list_image)}
                     className={this.changeGoods?'add':'move'}> 
                <Link to={'/Exchange-index.html/product/'+CateGood.item_id}  className="upItem " data-id={CateGood.item_id}>
                <div className="info-img">
                <LazyLoad  placeholder={<PlaceholderComponent />}>
                <img alt=''  src={CateGood.list_image}/>
                </LazyLoad>
                </div>
                <div className="info-bar">
                <div className="pro-title">{CateGood.goods_name}</div>
                <div className="e-numb">
                <span className="e-price"><em className='moneyPrice'>{CateGood.exchange_points}</em>积分</span>
             {pointsHtml}
                </div>
                </div>
                </Link>
                 </li>
                )
            }, this)
        } else if (this.props.pageStatus === 0 && !CateGoods.length) {
            CateGoodList = <DataNone />;
        }

        return (


            <div className="app-pd-wp" >
        <div className='fixedHeight' style={{'display':this.state.scrollFixed?'block':'none'}}></div>
                        <p ref="PullUp" id="PullUp" dangerouslySetInnerHTML={{__html:this.pullUpTips[this.props.pullUpStatus]}} />
                <div className="app-pd-list" >
                   <ul >
                {CateGoodList}
                   </ul>
                    </div>
              <p ref="PullDown" id="PullDown" dangerouslySetInnerHTML={{__html:this.pullDownTips[this.props.pullDownStatus]}} />
     
                    </div>



        )
    }
    render() {

        return this.renderPage()
    }
}


export default CateGoods;
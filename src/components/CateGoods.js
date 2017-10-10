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
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
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

    handleScroll() {
        let scrollwrap = document.getElementById('scrollwrap').offsetHeight
        let bodyBox = document.getElementById('root')
        let clientHeight = this.getClientHeight(); //可视区域高度
        let scrollTop = this.getScrollTop(); //滚动条滚动高度
        let scrollHeight = this.getScrollHeight(); //滚动内容高度
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


        if ((clientHeight + scrollTop) == (scrollHeight) && this.props.pageStatus == 1 && this.isDataing === false) {
            this.isDataing = true;
            this.props.changeGoods();

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
    handleClick(goods_name, item_price, list_image) {
        this.props.detailData(goods_name, item_price, list_image)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.cateGoods !== this.props.cateGoods) {
            this.isDataing = false;
        }
    }
    renderPage() {
        let bodyBox = document.getElementById('root')
        let CateGoodList = [];
        let CateGoods = this.props.cateGoods;
        if (CateGoods != '') {
            CateGoodList = CateGoods.map((CateGood, index) => {
                return (

                    <li  key={index} onClick={this.handleClick.bind(this,CateGood.goods_name,CateGood.item_price,CateGood.list_image)}
                     className={this.changeGoods?'add':'move'}> 
                <Link to={'/Exchange-index.html/product/'+CateGood.item_id}  className="upItem " data-id={CateGood.item_id}>
                <div className="info-img">
                <LazyLoad  placeholder={<PlaceholderComponent />}>
                <img  src={CateGood.list_image}/>
                </LazyLoad>
                </div>
                <div className="info-bar">
                <div className="pro-title">{CateGood.goods_name}</div>
                <div className="e-numb">
                <span className="e-price"><em>{CateGood.item_price}</em>积分</span>
                </div>
                </div>
                </Link>
                 </li>
                )
            }, this)
        } else if (this.props.pageStatus == 0 && CateGoods == 0) {
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
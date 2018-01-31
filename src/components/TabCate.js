import React from 'react';
import $ from 'jquery';
import {
    Motion,
    spring
} from 'react-motion';
import CateGoods from './CateGoods';
import {
    Link
} from 'react-router-dom'
import LazyLoad from 'react-lazyload';
import PlaceholderComponent from './public/Placeholder';
class TabCate extends React.Component {

    constructor(props) {
        super(props);
        this.touchRange = 0 // 触控距离
        this.touchLeft = 0;
        this.onClick = false;
        this.state = {
            move: this.props.moveWidths,
            currentIndex: this.props.pushIndex,
            actIndex: 0,
            liWidth: this.props.liWidth,
            onStartX: 0,
            onMoveX: 0

        };
    };

    handleClick(index, id) {

        let scrollwrap = document.getElementById('scrollwrap').offsetHeight
        let promise = new Promise(function(resolve, rejeact) {
            resolve();
        });
        promise.then(() => {
            this.props.get_cate_goods(id, 0)
        }).then(() => {
            $('html,body').animate({
                    scrollTop: scrollwrap
                },
                1000);
        })
        this.props.UpDataCateId(id);

        this.props.UpDataPullUpStatus(0);
        this.onClick = true;
        var widths = 0;
        for (let i = 0; i < index; i++) {
            widths += parseFloat($('.app-scroller li').eq(i).width());
        }
        let liWidth = parseFloat($('.app-scroller li').eq(index).width());
        this.setState({
            move: widths,
            currentIndex: index,
            liWidth: liWidth,
            actIndex: index
        });
        this.props.liMove(index, widths, liWidth)

        let fl_w = $('.app-scroller').width();
        let flb_w = $('.app-scroller-wrap').width();

        let nav_w = parseFloat($('.app-scroller li').eq(index).width())
        let fn_w = ($('.app-scroller-wrap').width() - nav_w) / 2;

        if (widths <= fn_w || fl_w <= flb_w) {
            this.setState({
                wrapWidth: 0
            });
        } else if (fn_w - widths <= flb_w - fl_w) {

            this.setState({
                wrapWidth: flb_w - fl_w
            });
        } else {
            this.setState({
                wrapWidth: fn_w - widths
            });
        }

    }

    cheack(index) {
        return index === this.state.currentIndex ? 'act' : '';
    }
    firstWidth(w) {
        this.props.liMove(0, 0, w)
    }
    startMoveImg(e) {
        this.touchRange = e.touches[0].pageX;

        this.touchLeft = this.state.wrapWidth
    }
    movingImg(e) {
        let moving = e.touches[0].pageX
        let addWidth = $('.app-scroller').width();
        let screenWidth = $('.app-scroller-wrap').width();
        if (screenWidth <= addWidth) {
            if (this.touchLeft + moving - this.touchRange >= 0) {
                this.setState({
                    wrapWidth: 0
                })
            } else if (this.touchLeft + moving - this.touchRange <= screenWidth - addWidth) {
                console.log(addWidth - screenWidth);
                this.setState({
                    wrapWidth: -(addWidth - screenWidth)
                })

            } else {

                this.setState({
                    wrapWidth: this.touchLeft + moving - this.touchRange
                })
            }
        }
    }
    changeIsData(e) {
        this.props.changeIsData(e)
    }
    detailData(goods_name, exchange_points, item_price, list_image) {
        this.props.detailData(goods_name, exchange_points, item_price, list_image)
    }
    fixWrap(e) {
        this.refs.CateGoods.handleScroll(e)
    }
    getContentItemCssClasses(index) {
        return index === this.state.actIndex ? "tab-content-item active" : "tab-content-item";
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.loadingStatus !== this.props.loadingStatus) {
            let nav_w = $('.app-scroller li').first().width();
            this.props.liMove(0, 0, nav_w)
        }
    }
    render() {
        console.log(this.props.tabGoods);
        let that = this;
        let {
            baseWidth
        } = this.props;
        // let childrenLength = this.props.children.length;
        if (!this.onClick) {
            let nav_w = $('.app-scroller li').first().width();
            $('.choose-items-wp p').width(nav_w);

        }
        let CateLists = this.props.cateList;
        let CateList = CateLists.map(function(Cate, index) {
            return (
                <li key={index} className={this.cheack(index)} id={Cate.cate_id} onClick={this.handleClick.bind(this,index,Cate.cate_id)}><a><span>{Cate.cate_name}</span></a></li>
            )
        }, this)

        let CateGoodList = [];
        let GoodListLi = [];
        let CateGoods = this.props.cateGoods;
        // let GoodList = []
        let GoodList = this.props.cateGoods.map((tabs, index) => {

            // let GoodListLi = tabs.map((tab, index) => {
            //     return (

            //         <li key={index} className='add'> 
            //         <Link to={this.props.baseUrl+'/product/'+tab.item_id}  className="upItem " data-id={tab.item_id}>
            //     <div className="info-img">
            //     <LazyLoad height={200} placeholder={<PlaceholderComponent />}>
            //     <img className='lazy' alt=''  src={tab.list_image}/>
            //     </LazyLoad>
            //     </div>
            //     <div className="info-bar">
            //     <div className="pro-title">{tab.goods_name}</div>
            //     <div className="e-numb">
            //     <span className="e-price"><em className='moneyPrice'>{tab.exchange_points}</em>积分</span>
            //     </div>
            //     </div>
            //     </Link>
            //      </li>

            //         // <div key={index}  id={index} className={this.getContentItemCssClasses(index)}>
            //         //  <div className="app-pd-list">
            //         //  {tabs}
            //         // </div>
            //         //  </div>
            //     )
            // }, this)


            return (


                <div key={index}  id={index} className={this.getContentItemCssClasses(index)}>
             <div className="app-pd-list">
             {GoodListLi}
            </div>
             </div>
            )
        }, this)

        return (
            <div>
       
    <Motion style={{x: spring(this.state.move),width:spring(this.state.liWidth),navw:spring(this.state.wrapWidth)}}>
                           {({x,width,navw}) =>
            <div id="app-scroller"  className="app-scroller-wrap" onTouchStart={this.startMoveImg.bind(this)}  onTouchMove={this.movingImg.bind(this)}>
            <div className="app-scroller" style={{WebkitTransform: `translate3d(${this.state.wrapWidth}px, 0, 0)`,transform: `translate3d(${this.state.wrapWidth}px, 0, 0)`}} >
                            <ul className="choose-items-wp">
                            {CateList}
            <p style={{WebkitTransform: `translate3d(${x}px, 0, 0)`,transform: `translate3d(${x}px, 0, 0)`,width:`${width}px`}}><b></b></p>
                            </ul>
                        </div>
                    </div>
}
        </Motion>
 <div className="tab-content-list">

<div className="app-pd-list">
     {GoodList}

{/*


          {React.Children.map(this.props.children, (element, index) => {
            return ()
          })}  

          */}
        </div>
  
        </div>

      
                </div>
        )
    }
}
export default TabCate;
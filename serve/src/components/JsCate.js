import React from 'react';
import $ from 'jquery';
import {
    Motion,
    spring
} from 'react-motion';
import CateGoods from './CateGoods';


class JsCate extends React.Component {

    constructor(props) {
        super(props);
        this.touchRange = 0 // 触控距离
        this.touchLeft = 0;
        this.onClick = false;
        this.state = {
            move: this.props.moveWidths,
            currentIndex: this.props.pushIndex,
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
            liWidth: liWidth
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
    componentWillReceiveProps(nextProps) {
        if (nextProps.loadingStatus !== this.props.loadingStatus) {
            let nav_w = $('.app-scroller li').first().width();
            this.props.liMove(0, 0, nav_w)
        }
    }
    render() {
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
        <CateGoods ref='CateGoods' baseUrl={this.props.baseUrl} changeIsData={this.changeIsData.bind(this)} ref='CateGoods' detailData={this.detailData.bind(this)} cateGoods={this.props.cateGoods} pageStatus={this.props.pageStatus} pullUpStatus={this.props.pullUpStatus} pullDownStatus={this.props.pullDownStatus} changeGoods={this.props.changeGoods} />
    

      
                </div>
        )
    }
}
export default JsCate;
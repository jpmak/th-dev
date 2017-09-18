import React from 'react';
import $ from 'jquery';

import LazyLoad from 'react-lazyload';
import {
    Motion,
    spring
} from 'react-motion';
import PlaceholderComponent from './public/Placeholder';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

class SalesWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.touchRange = 0 // 触控距离
        this.touchLeft = 0;
        this.state = {
            wrapWidth: 0,
        };
    };

    startMoveImg(e) {
        this.touchRange = e.touches[0].pageX;
        this.touchLeft = this.state.wrapWidth
    }
    movingImg(e) {
        let moveDirection = e.touches[0].pageX - this.touchRange // 当滑动到边界时，再滑动会没有效果
        let moving = e.touches[0].pageX
        let wrapWidth = this.state.wrapWidth;
        let addWidth = $('.jf-bsell-box .list').width();
        let screenWidth = $('#sales-wrapper').width();
        if (screenWidth <= addWidth) {
            if (this.touchLeft + moving - this.touchRange >= 0) {
                this.setState({
                    wrapWidth: 0
                })
            } else if (this.touchLeft + moving - this.touchRange <= screenWidth - addWidth) {
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
    render() {
        let settings = {
            touchAction: 'compute',
            recognizers: {
                tap: {
                    time: 600,
                    threshold: 100
                }
            }
        };
        let goodsHtmls = this.props.salesItems;
        let goodsList = goodsHtmls.map(function(goods, index) {
            var sales_top = 'top '
            switch (index) {
                case 0:
                    sales_top = 'top t1';
                    break;
                case 1:
                    sales_top = 'top t2';
                    break;
                case 2:
                    sales_top = 'top t3';
                    break;
            }
            return (

                <li key={index}><Link to={'/product/'+goods.item_id+'.html'} className="upItem" data-id={goods.item_id}  ><div className="info-img"><div className={sales_top}></div>
         
                <img  src={goods.list_image} />
 
                </div><div className="info-bar"><div className="e-numb"><span className="e-price"><em>{goods.item_price} </em>积分</span></div></div></Link> </li>

            )

        });
        if (!goodsList.length) {
            goodsList = <div>loading...</div>
        }
        return (
            <Motion style={{navw:spring(this.state.wrapWidth)}}>
                           {({navw}) =>

            <div id="sales-wrapper" onTouchStart={this.startMoveImg.bind(this)}  onTouchMove={this.movingImg.bind(this)}>

            <div className='hor-view'>
<div className='tag'>热门推荐</div>
            </div>
                <div id="scroller" className="list" style={{WebkitTransform: `translate3d(${navw}px, 0, 0)`,transform: `translate3d(${navw}px, 0, 0)`}} >
                        <ul>{goodsList}</ul>
                    </div>

</div>
       }
</Motion>

        );

    }
}


export default SalesWrapper;